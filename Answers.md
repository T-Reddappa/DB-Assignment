1. Explain the relationship between the "Product" and "Product_Category" entities from the above diagram.

   **One-to-Many-Relationship** is the relationship between the "Product" and "Product_Category" entities/objects.
   This means,
      1.Each Product can belong to only one category
      2. A Category can have multiple products associated with it
  


  
2. How could you ensure that each product in the "Product" table has a valid category assigned to it?

   1.We can desing the database schema for the 'Product' object references to the particulate 'Category' object Id,
    like shown in the below code
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;

      // Defining the schema for Product Category
          const productCategorySchema = new Schema({
            name: String,
            description: String
          });

      //Defining the schema for Product
        const productSchema = new Schema({
          name: String,
          description: String,
          price: Number,
        **  categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Product_Category',
            required: true
          }**
        });
        
      // Creating models from the schemas
        const Product_Category = mongoose.model('Product_Category', productCategorySchema);
        const Product = mongoose.model('Product', productSchema);

   2. Schema Validation to ensure the category is assigned correctly,
      
      async function createProduct(name, description, price, categoryId) {
      
       ** try {
          // Validate category ID
          const category = await Product_Category.findById(categoryId);
          if (!category) {
            throw new Error('Invalid category ID');
          }**
      
      // Create and save the product
          const newProduct = await Product.create({
            name,
            description,
            price,
            categoryId
          });
          console.log('Product saved:', newProduct);
          return newProduct;
        } catch (error) {
          console.error('Error saving product:', error);
          throw error;
        }
      }


