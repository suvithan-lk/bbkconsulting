import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  User,
  CreditCard,
  Briefcase,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Service, ConsultantWithUser } from '../types/database.types';

const steps = [
  { id: 1, name: 'Service', description: 'Choose your service' },
  { id: 2, name: 'Consultant', description: 'Select an expert' },
  { id: 3, name: 'Schedule', description: 'Pick a time slot' },
  { id: 4, name: 'Confirm', description: 'Review & book' },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
];

export function BookPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [consultants, setConsultants] = useState<ConsultantWithUser[]>([]);

  const [selectedService, setSelectedService] = useState<string | null>(
    searchParams.get('service')
  );
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(
    searchParams.get('consultant')
  );
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetchConsultants(selectedService);
    }
  }, [selectedService]);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('active', true);
    if (data) setServices(data);
  };

  const fetchConsultants = async (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const { data } = await supabase
      .from('consultants')
      .select('*, user:users(*)')
      .eq('specialization', service.category)
      .eq('verified', true);

    if (data) setConsultants(data as ConsultantWithUser[]);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedConsultant !== null;
      case 3:
        return selectedDate !== '' && selectedTime !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = async () => {
    if (!user || !selectedService || !selectedConsultant || !selectedDate || !selectedTime) {
      return;
    }

    setLoading(true);

    const service = services.find((s) => s.id === selectedService);

    const { error } = await supabase.from('appointments').insert({
      client_id: user.id,
      consultant_id: selectedConsultant,
      service_id: selectedService,
      scheduled_date: selectedDate,
      scheduled_time: selectedTime,
      notes,
      status: 'pending',
    });

    setLoading(false);

    if (!error) {
      navigate('/client/dashboard?booking=success');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container-custom">
          <div className="text-center max-w-md mx-auto">
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-slate-500 mb-6">
              Please sign in to book a consultation with our experts.
            </p>
            <Link to={`/login?redirect=${window.location.pathname}`} className="btn-primary">
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const selectedConsultantData = consultants.find((c) => c.id === selectedConsultant);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom py-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <h1 className="text-2xl font-bold">Book a Consultation</h1>
          <p className="text-slate-500">
            Complete the steps below to schedule your session
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  idx < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentStep > step.id
                        ? 'bg-primary-600 text-white'
                        : currentStep === step.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400'
                    }`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id
                      ? 'bg-primary-600'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="container-custom py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-bold mb-6">Select a Service</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      selectedService === service.id
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">{service.title}</h3>
                        <p className="text-sm text-slate-500 mb-3">{service.category}</p>
                        <p className="text-xl font-bold text-primary-600">
                          ${service.price.toLocaleString()}
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedService === service.id
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-slate-300'
                      }`}>
                        {selectedService === service.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-3 line-clamp-2">
                      {service.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Consultant */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-bold mb-6">Select a Consultant</h2>
              {consultants.length > 0 ? (
                <div className="space-y-4">
                  {consultants.map((consultant) => (
                    <button
                      key={consultant.id}
                      onClick={() => setSelectedConsultant(consultant.id)}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                        selectedConsultant === consultant.id
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-medium">
                          {consultant.user.avatar_url ? (
                            <img
                              src={consultant.user.avatar_url}
                              alt={consultant.user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            consultant.user.name?.charAt(0)
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold">{consultant.user.name}</h3>
                          <p className="text-sm text-slate-500">{consultant.specialization}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-slate-600">
                              {consultant.experience_years}+ years exp.
                            </span>
                            <span className="text-sm font-medium">${consultant.hourly_rate}/hr</span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedConsultant === consultant.id
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-slate-300'
                        }`}>
                          {selectedConsultant === consultant.id && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : selectedService ? (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No consultants available for this service.</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Please select a service first.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Select Date & Time */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-bold mb-6">Select Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="card p-6">
                  <h3 className="font-semibold mb-4">Select Date</h3>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input w-full"
                  />
                </div>

                {/* Time Slots */}
                <div className="card p-6">
                  <h3 className="font-semibold mb-4">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-primary-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="card p-6 mt-6">
                <h3 className="font-semibold mb-4">Additional Notes (Optional)</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share any specific questions or topics you'd like to discuss..."
                  rows={4}
                  className="input resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-bold mb-6">Confirm Your Booking</h2>

              <div className="card p-6 space-y-6">
                {/* Service */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Service</p>
                      <p className="font-semibold">{selectedServiceData?.title}</p>
                    </div>
                  </div>
                  <p className="font-bold text-primary-600">
                    ${selectedServiceData?.price.toLocaleString()}
                  </p>
                </div>

                {/* Consultant */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
                      {selectedConsultantData?.user.avatar_url ? (
                        <img
                          src={selectedConsultantData.user.avatar_url}
                          alt={selectedConsultantData.user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        selectedConsultantData?.user.name?.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Consultant</p>
                      <p className="font-semibold">{selectedConsultantData?.user.name}</p>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Date & Time</p>
                      <p className="font-semibold">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        {' '}at {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Client */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Booking for</p>
                      <p className="font-semibold">{profile?.name || user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Summary */}
              {notes && (
                <div className="card p-6 mt-4">
                  <p className="text-sm text-slate-500 mb-2">Notes</p>
                  <p className="text-slate-700 dark:text-slate-300">{notes}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="max-w-3xl mx-auto mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleBooking}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Confirm Booking
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
