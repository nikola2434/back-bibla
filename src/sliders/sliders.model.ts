import { prop } from '@typegoose/typegoose';

export class SlidersModel {
  @prop({ required: true })
  poster: string;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  subtitle: string;

  @prop({ required: true })
  link: string;
}
