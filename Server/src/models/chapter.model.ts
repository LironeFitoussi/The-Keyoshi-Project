import mongoose, { Document, Schema } from 'mongoose';

export interface IChapter extends Document {
  title: string;
  hebrewTitle: string;
  index: number;
  content: string;
  isTranslated: boolean;
  bookId: mongoose.Types.ObjectId;
  createdAt: Date;
  // Approval workflow fields
  submittedContent?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  submittedBy?: mongoose.Types.ObjectId;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  submittedAt?: Date;
  rejectionReason?: string;
}

const chapterSchema: Schema<IChapter> = new Schema({
  title: { type: String, required: true },
  hebrewTitle: { type: String, required: true },
  index: { type: Number, required: true },
  content: { type: String, required: false },
  isTranslated: { type: Boolean, default: false },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  createdAt: { type: Date, default: Date.now },
  // Approval workflow fields
  submittedContent: { type: String, required: false },
  status: { 
    type: String, 
    enum: ['draft', 'pending', 'approved', 'rejected'], 
    default: 'draft' 
  },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  reviewedAt: { type: Date, required: false },
  submittedAt: { type: Date, required: false },
  rejectionReason: { type: String, required: false },
});

// Validation for unique index field in the same book
chapterSchema.pre('save', async function (next) {
  const chapter = this as IChapter;
  const existingChapter = await Chapter.findOne({ bookId: chapter.bookId, index: chapter.index });
  if (existingChapter) {
    throw new Error('Chapter index must be unique in the same book');
  }
  next();
});

const Chapter = mongoose.model<IChapter>('Chapter', chapterSchema);

export default Chapter;
