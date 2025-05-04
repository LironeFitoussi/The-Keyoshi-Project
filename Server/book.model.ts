import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  slug: string;
  createdAt: Date;
}

const bookSchema: Schema<IBook> = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Allow JSON and stringify
bookSchema.set('toJSON', { virtuals: true });
bookSchema.set('toObject', { virtuals: true });

// Pre Create Hook to generate slug
bookSchema.pre<IBook>('save', function(next: (err?: Error) => void) {
  this.slug = this.title.toLowerCase().replace(/ /g, '-');
  next();
});

// Virtual field for chapters only for fetch by id
bookSchema.virtual('chapters', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'bookId',
  justOne: false,
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
