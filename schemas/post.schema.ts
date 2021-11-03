import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Date } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  user: ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop([String])
  likes: [
    {
      user: {
        type: ObjectId;
      };
    },
  ];

  @Prop({ default: Date.now })
  comments: [
    {
      user: {
        type: ObjectId;
      };
      text: {
        type: string;
        required: true;
      };
      name: {
        type: string;
      };
      avatar: {
        type: string;
      };
      date: {
        type: Date;
      };
    },
  ];
  @Prop({ required: true, default: Date.now })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
