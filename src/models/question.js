import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const QuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['EASY', 'MEDIUM', 'HARD', 'EXTREME'],
      required: true
    },
    constraints: [
      {
        type: String
      }
    ],
    max_score: {
      type: Number,
      required: true
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    creator_lock: {
      type: Boolean,
      required: true,
      default: false
    },
    codebase_url: {
      type: String,
      required: true
    }
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

QuestionSchema.plugin(mongoosePaginate);

QuestionSchema.index({ createdAt: 1 });

const Question = mongoose.model('Question', QuestionSchema);

Question.syncIndexes();

export default Question;
