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
}
