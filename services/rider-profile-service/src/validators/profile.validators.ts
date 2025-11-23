import Joi from 'joi';

export const profileValidators = {
  updateProfile: Joi.object({
    full_name: Joi.string().min(2).max(100),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
    email: Joi.string().email(),
    address: Joi.string().max(255),
    city: Joi.string().max(100),
    state: Joi.string().max(100),
    country: Joi.string().length(2),
    postal_code: Joi.string().max(20),
    date_of_birth: Joi.date().max('now'),
    gender: Joi.string().valid('male', 'female', 'other'),
    vehicle_type: Joi.string().valid('motorcycle', 'bicycle', 'car', 'scooter', 'van'),
    vehicle_make: Joi.string().max(50),
    vehicle_model: Joi.string().max(50),
    vehicle_year: Joi.number().integer().min(1990).max(new Date().getFullYear() + 1),
    vehicle_plate_number: Joi.string().max(20)
  }),

  emergencyContact: Joi.object({
    name: Joi.string().required().min(2).max(100),
    phone: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/),
    relationship: Joi.string().required().max(50)
  }),

  bankDetails: Joi.object({
    accountName: Joi.string().required().min(2).max(100),
    accountNumber: Joi.string().required().min(8).max(20),
    bankName: Joi.string().required().max(100),
    bankCode: Joi.string().required().max(20),
    swiftCode: Joi.string().max(11)
  })
};
