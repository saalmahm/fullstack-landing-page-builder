import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

@Schema()
export class Page extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Array })
  components: any[];

  @Prop({ required: true, type: Object })
  theme: Theme;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
