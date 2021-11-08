import { Controller, Post, Request, HttpException } from '@nestjs/common';
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

    return this.postService.createPost(req);
  }
}
