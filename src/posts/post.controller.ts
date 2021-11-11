import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Request,
  HttpException,
} from '@nestjs/common';
import { createPostSchema } from 'validation/post.schemas';
import { PostService } from './index';

@Controller('/api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  // @route   POST api/posts
  // @desc    Create post
  // @access  Private
  @Post()
  async createPost(@Request() req) {
    const { error } = createPostSchema.validate(req.body);
    if (error) {
      throw new HttpException(error.message, 400);
    }

    return await this.postService.createPost(req);
  }

  // @route   GET api/posts
  // @desc    Get all posts
  // @access  Private
  @Get()
  async getPosts() {
    return this.postService.getPosts();
  }

  // @route   GET api/posts/:id
  // @desc    Get post by id
  // @access  Private
  @Get('/:id')
  async getPostById(@Request() req) {
    const { id } = await req.params;
    return await this.postService.getPostById(id);
  }

  // @route   DELETE api/posts/:id
  // @desc    Delete post by id
  // @access  Private
  @Delete('/:id')
  async deletePostById(@Request() req) {
    const { id } = await req.params;
    return await this.postService.deletePostById(id, req);
  }

  // @route   PUT api/posts/:id
  // @desc    Update post by id
  // @access  Private
  @Put('/like/:id')
  async updatePostById(@Request() req) {
    const { id } = await req.params;
    return await this.postService.likePost(id, req);
  }

  // @route    PUT api/posts/unlike/:id
  // @desc     Unlike a post
  // @access   Private
  @Put('/unlike/:id')
  async unlikePost(@Request() req) {
    const { id } = await req.params;
    return await this.postService.unlikePost(id, req);
  }

  // @route   POST api/posts/comment/:id
  // @desc    Comment on post
  // @access  Private
  @Post('/comment/:id')
  async commentOnPost(@Request() req) {
    const { id } = await req.params;
    return await this.postService.commentOnPost(id, req);
  }

  // @route   DELETE api/posts/comment/:id/:comment_id
  // @desc    Delete comment
  // @access  Private
  @Delete('/comment/:id/:comment_id')
  async deleteComment(@Request() req) {
    const { id, comment_id } = await req.params;
    return await this.postService.deleteComment(id, comment_id, req);
  }
}
