const mongoose = require('mongoose')

// schema for Product Category
const productCategorySchema  =new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  created_at : {
    type:Date,
    default: Date.now
  },
  modified_at: {
    type:Date,
    default: Date.now
  },
  deleted_at :{
    type:Date,
    default:null
  }
})

//schema for Product Inventory
const productInventorySchema = new mongoose.Schema({
    quantity:{
      type:Number,
      required:true
    },
    created_at : {
    type:Date,
    default: Date.now
  },
  modified_at: {
    type:Date,
    default: Date.now
  },
  deleted_at :{
    type:Date,
   default:null
  }
})

//Schema for productDiscount
const productDiscountSchema = new mongoose.Schema({
  name:{
  type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  discount_percent: {
    type:Number,
    required:true
  },
  active:{
    type:Boolean,
    required:true
  },
   created_at : {
    type:Date,
    default: Date.now
  },
  modified_at: {
    type:Date,
    default: Date.now
  },
  deleted_at :{
    type:Date,
  default:null
  }
})
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
const ProductInventory = mongoose.model('ProductInventory', productInventorySchema);
const ProductDiscount = mongoose.model('ProductDiscount', productDiscountSchema);


//Product Schema

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  desc:{
 type:String,
    required:true
  },
  SKU: {
    type:String,
    required:true
  },
  category_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'ProductCategory',
    required:true
  },
  inventory_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'ProductInventory',
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  discount_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'ProductDiscount',
    required:true
  },
    created_at : {
    type:Date,
    default: Date.now
  },
  modified_at: {
    type:Date,
    default: Date.now
  },
  deleted_at :{
    type:Date,
  default:null
  }

})


//using Pre-save hook for updating modified_at
productCategorySchema.pre('save', function (next) {
  if (this.isModified()) {
    this.modified_at = new Date();
  }
  next();
});

productInventorySchema.pre('save', function (next) {
  if (this.isModified()) {
    this.modified_at = new Date();
  }
  next();
});

productDiscountSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.modified_at = new Date();
  }
  next();
});

productSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.modified_at = new Date();
  }
  next();
});

const Product = mongoose.model('Product', productSchema)

  
    
