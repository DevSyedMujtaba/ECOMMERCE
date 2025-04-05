const Joi = require('joi');

// Signup Schema for validating the payload which the user will be sending to the server
const signupSchema = Joi.object({
    username: Joi.string()
        .lowercase()
        .required()
        .messages({
            'string.base': 'Username must be a string.',
            'string.empty': 'Username is required.',
            'any.required': 'Username is required.'
        }),
    email: Joi.string()
        .email()
        .lowercase()
        .required()
        .messages({
            'string.base': 'Email must be a string.',
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'Password must be a string.',
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 3 characters long.',
            'any.required': 'Password is required.'
        }),
});

// Login Schema for validating the payload which the user will be sending to the server
const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required().messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be valid.',
    }),
    password: Joi.string().min(3).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 3 characters.',
    }),
});

// Product Schema for validating the payload which the user will be sending to the server
const productSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': 'Title must be a string.',
            'string.empty': 'Title is required.',
            'string.min': 'Title must be at least 3 characters.',
            'string.max': 'Title must not exceed 100 characters.'
        }),

    desc: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Description is required.',
            'string.min': 'Description must be at least 10 characters long.',
            'string.max': 'Description must not exceed 1000 characters.'
        }),

    size: Joi.string()
        .valid('Small', 'Medium', 'Large', 'XL', 'XXL') // You can adjust based on allowed sizes
        .optional()
        .messages({
            'any.only': 'Size must be one of Small, Medium, Large, XL, XXL.'
        }),

    color: Joi.string()
        .min(3)
        .max(30)
        .optional()
        .messages({
            'string.min': 'Color must be at least 3 characters.',
            'string.max': 'Color must not exceed 30 characters.'
        }),

    price: Joi.number()
        .min(0)
        .precision(2)
        .required()
        .messages({
            'number.base': 'Price must be a number.',
            'number.min': 'Price must be a positive value.',
            'number.precision': 'Price must have at most 2 decimal places.'
        }),
});

// productIdSchema for validating the route parameter (id) when accessing a specific product.
const productIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        'string.base': 'Product ID must be a string.',
        'string.length': 'Product ID must be exactly 24 characters.',
        'string.hex': 'Product ID must only contain hexadecimal characters.',
        'any.required': 'Product ID is required.'
    }),
});

// cartItemSchema for validating the payload when a user adds an item to the cart.
// It ensures that the userId and productId are valid MongoDB ObjectIds (24-character hexadecimal strings).
const cartItemSchema = Joi.object({
    userId: Joi.string().length(24).hex().required().messages({
        'string.base': 'User ID must be a string.',
        'string.length': 'User ID must be exactly 24 characters.',
        'string.hex': 'User ID must only contain hexadecimal characters.',
        'any.required': 'User ID is required.'
    }),

    productId: Joi.string().length(24).hex().required().messages({
        'string.base': 'Product ID must be a string.',
        'string.length': 'Product ID must be exactly 24 characters.',
        'string.hex': 'Product ID must only contain hexadecimal characters.',
        'any.required': 'Product ID is required.'
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number.',
        'number.integer': 'Quantity must be an integer.',
        'number.min': 'Quantity must be at least 1.',
        'any.required': 'Quantity is required.'
    }),
});

// userIdSchema for validating the route parameter (userId) when accessing cart details.
const userIdSchema = Joi.object({
    userId: Joi.string().length(24).hex().required().messages({
        'string.base': 'User ID must be a string.',
        'string.length': 'User ID must be exactly 24 characters.',
        'string.hex': 'User ID must only contain hexadecimal characters.',
        'any.required': 'User ID is required.'
    }),
});

// cartParamsSchema for validating route parameters (userId and productId) in cart deletion
const cartParamsSchema = Joi.object({
    userId: Joi.string().length(24).hex().required().messages({
        'string.base': 'User ID must be a string.',
        'string.length': 'User ID must be exactly 24 characters.',
        'string.hex': 'User ID must only contain hexadecimal characters.',
        'any.required': 'User ID is required.'
    }),
    productId: Joi.string().length(24).hex().required().messages({
        'string.base': 'Product ID must be a string.',
        'string.length': 'Product ID must be exactly 24 characters.',
        'string.hex': 'Product ID must only contain hexadecimal characters.',
        'any.required': 'Product ID is required.'
    }),
});

// orderSchema for validating the request body when creating a new order
const orderSchema = Joi.object({
    userId: Joi.string().length(24).hex().required().messages({
        'string.base': 'User ID must be a string.',
        'string.length': 'User ID must be exactly 24 characters.',
        'string.hex': 'User ID must contain only hexadecimal characters.',
        'any.required': 'User ID is required.'
    }),

    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().length(24).hex().required().messages({
                'string.base': 'Product ID must be a string.',
                'string.length': 'Product ID must be exactly 24 characters.',
                'string.hex': 'Product ID must contain only hexadecimal characters.',
                'any.required': 'Product ID is required.'
            }),
            quantity: Joi.number().integer().min(1).default(1).messages({
                'number.base': 'Quantity must be a number.',
                'number.integer': 'Quantity must be an integer.',
                'number.min': 'Quantity must be at least 1.'
            })
        })
    ).min(1).required().messages({
        'array.base': 'Products must be an array.',
        'array.min': 'At least one product is required.',
        'any.required': 'Products are required.'
    }),

    amount: Joi.number().min(0).required().messages({
        'number.base': 'Amount must be a number.',
        'number.min': 'Amount must be a positive value.',
        'any.required': 'Amount is required.'
    }),

    address: Joi.string().min(5).max(500).required().messages({
        'string.base': 'Address must be a string.',
        'string.min': 'Address must be at least 5 characters long.',
        'string.max': 'Address must not exceed 500 characters.',
        'any.required': 'Address is required.'
    }),

    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').optional().messages({
        'string.base': 'Status must be a string.',
        'any.only': 'Status must be one of: pending, shipped, delivered, cancelled.'
    })

});


module.exports = {
    signupSchema,
    loginSchema,
    productSchema,
    productIdSchema,
    cartItemSchema,
    userIdSchema,
    cartParamsSchema,
    orderSchema
}