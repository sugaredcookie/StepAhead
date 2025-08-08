const mongoose = require('mongoose');

const studentDetailsSchema = new mongoose.Schema({
  // Basic Information
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Student name is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  age: {
    type: Number,
    min: 2,
    max: 6
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  photo: {
    type: String, // URL to stored image
    default: ''
  },

  // Class Information
  classGroup: {
    type: String,
    enum: ['Level 0', 'Level 1', 'Lelvel 2', 'Level 3'],
    required: true
  },
  section: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    default: 'A'
  },
  academicYear: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  rollNumber: {
    type: Number,
    required: true
  },

  // Parent/Guardian Information
parentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},  
  parentName: {
    type: String,
    required: [true, 'Parent name is required']
  },
  parentContact: {
    type: String,
    required: [true, 'Contact number is required'],
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  parentEmail: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  parentOccupation: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },

  // Medical Information
  allergies: [String],
  medicalConditions: [String],
  doctorName: String,
  doctorContact: String,

  // Fees Information
  feeDetails: {
    totalFee: {
      type: Number,
      required: true
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    paymentHistory: [{
      amount: Number,
      paymentDate: Date,
      paymentMode: {
        type: String,
        enum: ['Cash', 'Cheque', 'Online Transfer', 'Card']
      },
      receiptNumber: String
    }]
  },

  // System Fields
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calculate age before saving
studentDetailsSchema.pre('save', function(next) {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
  }
  next();
});

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);
module.exports = StudentDetails;