import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ required: true, ref: 'User' })
  user: ObjectId;

  @Prop()
  company: string;

  @Prop()
  website: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop()
  bio: string;

  @Prop()
  githubusername: string;

  @Prop([String])
  experience: {
    title: { type: string; required: true };
    company: { type: string; required: true };
    location: { type: string };
    from: { type: Date; required: true };
    to: { type: Date };
    current: { type: boolean; default: false };
    description: { type: string };
  };

  @Prop([String])
  education: {
    school: { type: string; required: true };
    degree: { type: string; required: true };
    fieldofstudy: { type: string; required: true };
    from: { type: Date; required: true };
    to: { type: Date };
    current: { type: boolean; default: false };
    description: { type: string };
  };

  @Prop([String])
  social: {
    youtube: { type: string };
    twitter: { type: string };
    facebook: { type: string };
    linkedin: { type: string };
    instagram: { type: string };
  };

  @Prop({ default: Date.now })
  date: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
