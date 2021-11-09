import { PostDocument, UserDocument } from 'schemas/index';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { decrypt } from 'lib/crypting';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  // @route   POST api/users
  // @desc    Create post
  // @access  Private
  async createPost(req) {
    const token = req.headers['x-auth-token'];
    const decryptedToken = decrypt(token);
    if (!decryptedToken) {
      throw new HttpException('Invalid token', 401);
    }

    try {
      const user = await this.userModel
        .findById(decryptedToken.user.id)
        .select('-password');
      const newPost = new this.postModel({
        ...req.body,
        name: user.name,
        avatar: user.avatar,
        user: user._id,
      });

      const post = await newPost.save();
      return post;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  // @route   GET api/posts
  // @desc    Get all posts
  // @access  Private
  async getPosts() {
    try {
      const posts = await this.postModel.find().sort({ date: -1 });
      return posts;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  // @route   GET api/posts/:id
  // @desc    Get post by id
  // @access  Private
  async getPostById(id) {
    try {
      const post = await this.postModel.findById(id);

      if (!post) {
        throw new HttpException('Post not found', 404);
      }

      return post;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new HttpException('Invalid post id', 404);
      }

      throw new HttpException(error, 500);
    }
  }

  // @route   DELETE api/posts/:id
  // @desc    Delete post by id
  // @access  Private
  async deletePostById(id, req) {
    try {
      const post = await this.postModel.findById(id);
      const token = await req.headers['x-auth-token'];
      const decryptedToken = await decrypt(token);

      if (!post) {
        throw new HttpException('Post not found', 404);
      }

      // Check if post belongs to user
      if (post.user.toString() !== decryptedToken.user.id) {
        throw new HttpException('Not authorized', 401);
      }

      await post.remove();
      return {
        message: 'Post removed',
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new HttpException('Invalid post id', 404);
      }

      throw new HttpException(error, 500);
    }
  }

  // @route   PUT api/posts/like/:id
  // @desc    Like post
  // @access  Private
  async likePost(id, req) {
    try {
      const post = await this.postModel.findById(id);
      const token = await req.headers['x-auth-token'];
      const decryptedToken = await decrypt(token);

      if (!post) {
        throw new HttpException('Post not found', 404);
      }

      // Check if user already liked post
      if (
        post.likes.filter(
          (like: any) => like.user.toString() === decryptedToken.user.id,
        ).length > 0
      ) {
        throw new HttpException('Post already liked', 400);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      post.likes.unshift({ user: decryptedToken.user.id });
      await post.save();
      return post.likes;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new HttpException('Invalid post id', 404);
      }

      throw new HttpException(error, 500);
    }
  }

  // @route   PUT api/posts/unlike/:id
  // @desc    Unlike post
  // @access  Private
  async unlikePost(id, req) {
    try {
      const post = await this.postModel.findById(id);
      const token = await req.headers['x-auth-token'];
      const decryptedToken = await decrypt(token);

      if (!post) {
        throw new HttpException('Post not found', 404);
      }

      // Check if user already liked post
      if (
        post.likes.filter(
          (like: any) => like.user.toString() === decryptedToken.user.id,
        ).length === 0
      ) {
        throw new HttpException('Post has not yet been liked', 400);
      }

      // Get remove index
      const removeIndex = post.likes
        .map((like: any) => like.user.toString())
        .indexOf(decryptedToken.user.id);

      // Splice out of array
      post.likes.splice(removeIndex, 1);

      // Save
      await post.save();
      return post.likes;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new HttpException('Invalid post id', 404);
      }

      throw new HttpException(error, 500);
    }
  }
}
