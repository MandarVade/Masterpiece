import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check, Truck, Shield, RotateCcw, MapPin, User, Mail, Phone } from 'lucide-react';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Billing
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States'
  });

  const [orderItems] = useState([
    {
      id: 1,
      title: "Starry Night Over Rhine",
      artist: "Vincent van Gogh",
      price: 12500,
      quantity: 1,
      size: "Medium (24x36\")",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      price: 18900,
      quantity: 1,
      size: "Large (36x48\")",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=500&fit=crop"
    }
  ]);

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500; // Free shipping over $50,000
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', formData);
    setStep(4); // Success step
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: Truck },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-appear">
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Checkout
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your purchase securely
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-8">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step >= stepItem.number
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-600 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }`}>
                    {step > stepItem.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <stepItem.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`ml-3 font-semibold ${
                    step >= stepItem.number
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {stepItem.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ml-8 ${
                      step > stepItem.number
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-purple-600" />
                    Shipping Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your street address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your state"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your ZIP code"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    Payment Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter name as it appears on card"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <Lock className="w-5 h-5" />
                      <span className="text-sm font-semibold">Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Check className="w-6 h-6 text-purple-600" />
                    Review Your Order
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Shipping Address</h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <p className="text-gray-900 dark:text-white">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {formData.address}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {formData.country}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Payment Method</h3>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <p className="text-gray-900 dark:text-white">
                          **** **** **** {formData.cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Expires {formData.expiryDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Step */}
              {step === 4 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Thank you for your purchase. You'll receive a confirmation email shortly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/discover"
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Continue Shopping
                    </Link>
                    <Link 
                      to="/"
                      className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Go Home
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={step === 1}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Complete Order
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          by {item.artist}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {item.size}
                        </p>
                        <p className="text-gray-900 dark:text-white font-semibold text-sm">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Totals */}
                <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Security Features */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Truck className="w-4 h-4" />
                    <span>Free worldwide shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <RotateCcw className="w-4 h-4" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
