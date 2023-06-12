import { model, Schema } from 'mongoose';

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    location: String,
    status: Boolean,
    price: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    toJSON: {
        virtuals: true,
    }
});

HouseSchema.virtual('thumbnail_url').get(function(){

    return `http://localhost:3333/files/${this.thumbnail}`;
})

export default model('House', HouseSchema);