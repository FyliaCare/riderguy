'use client';

import { SEOHead } from '@/components/seo-head';
import { useState } from 'react';
import {
  Heart,
  Shield,
  AlertCircle,
  Phone,
  Building2,
  Briefcase,
  Users,
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Download,
  Upload,
  Calendar,
  TrendingUp,
  Award,
  Package,
  Bike,
  Home,
  Baby,
  GraduationCap,
  Pill,
  Stethoscope,
  Truck,
  Activity,
  MessageSquare,
  Settings,
  Info,
  X,
  Plus,
} from 'lucide-react';

export default function WelfarePage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'insurance' | 'support' | 'claims'>('overview');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showEmergency, setShowEmergency] = useState(false);

  // Welfare stats
  const welfareStats = {
    insuranceCoverage: 'Active',
    coverageAmount: 50000,
    claimsProcessed: 3,
    supportRequests: 8,
    emergencyContacts: 5,
    wellnessScore: 85,
  };

  // Insurance coverage
  const insuranceCoverage = {
    status: 'Active',
    provider: 'RiderGuard Insurance',
    policyNumber: 'RG-2024-8847',
    startDate: '2024-01-15',
    expiryDate: '2025-01-14',
    premium: 120,
    paymentFrequency: 'Monthly',
    coverageTypes: [
      {
        type: 'Medical Coverage',
        icon: Building2,
        limit: 20000,
        used: 3200,
        color: 'blue',
        details: ['Hospital bills', 'Doctor visits', 'Medications', 'Lab tests'],
      },
      {
        type: 'Accident Coverage',
        icon: Truck,
        limit: 30000,
        used: 0,
        color: 'red',
        details: ['Road accidents', 'Work injuries', 'Emergency treatment', 'Rehabilitation'],
      },
      {
        type: 'Vehicle Insurance',
        icon: Bike,
        limit: 15000,
        used: 2500,
        color: 'purple',
        details: ['Bike repairs', 'Parts replacement', 'Theft coverage', 'Third-party liability'],
      },
      {
        type: 'Life Insurance',
        icon: Shield,
        limit: 50000,
        used: 0,
        color: 'green',
        details: ['Life cover', 'Disability benefits', 'Family support', 'Funeral expenses'],
      },
    ],
  };

  // Support services
  const supportServices = [
    {
      id: 1,
      title: 'Emergency Medical Assistance',
      description: '24/7 medical emergency hotline and ambulance service',
      icon: Truck,
      color: 'red',
      status: 'Available',
      contact: '+233 50 123 4567',
      responseTime: 'Immediate',
      features: ['24/7 Hotline', 'Ambulance Dispatch', 'Hospital Coordination', 'Follow-up Care'],
    },
    {
      id: 2,
      title: 'Mental Health Support',
      description: 'Counseling services and mental wellness programs',
      icon: Heart,
      color: 'pink',
      status: 'Available',
      contact: '+233 50 123 4568',
      responseTime: 'Same Day',
      features: ['Free Counseling', 'Crisis Intervention', 'Stress Management', 'Support Groups'],
    },
    {
      id: 3,
      title: 'Legal Assistance',
      description: 'Legal advice and representation for work-related issues',
      icon: Briefcase,
      color: 'blue',
      status: 'Available',
      contact: '+233 50 123 4569',
      responseTime: '24-48 Hours',
      features: ['Legal Consultation', 'Court Representation', 'Document Review', 'Rights Education'],
    },
    {
      id: 4,
      title: 'Financial Assistance',
      description: 'Emergency loans and financial planning support',
      icon: DollarSign,
      color: 'green',
      status: 'Available',
      contact: '+233 50 123 4570',
      responseTime: '2-3 Days',
      features: ['Emergency Loans', 'Financial Planning', 'Savings Programs', 'Investment Advice'],
    },
    {
      id: 5,
      title: 'Housing Support',
      description: 'Assistance with accommodation and housing issues',
      icon: Home,
      color: 'orange',
      status: 'Available',
      contact: '+233 50 123 4571',
      responseTime: '1 Week',
      features: ['Rent Assistance', 'Housing Search', 'Landlord Mediation', 'Relocation Support'],
    },
    {
      id: 6,
      title: 'Education & Training',
      description: 'Scholarships and professional development programs',
      icon: GraduationCap,
      color: 'purple',
      status: 'Available',
      contact: '+233 50 123 4572',
      responseTime: 'Ongoing',
      features: ['Skills Training', 'Scholarships', 'Certification Programs', 'Career Counseling'],
    },
  ];

  // Recent claims
  const recentClaims = [
    {
      id: 1,
      type: 'Medical',
      description: 'Hospital visit for injury treatment',
      amount: 850,
      date: '2024-11-15',
      status: 'Approved',
      paidDate: '2024-11-18',
      icon: Building2,
    },
    {
      id: 2,
      type: 'Vehicle',
      description: 'Bike repair after minor accident',
      amount: 1200,
      date: '2024-11-10',
      status: 'Approved',
      paidDate: '2024-11-12',
      icon: Bike,
    },
    {
      id: 3,
      type: 'Medical',
      description: 'Prescription medication',
      amount: 320,
      date: '2024-11-05',
      status: 'Approved',
      paidDate: '2024-11-07',
      icon: Pill,
    },
    {
      id: 4,
      type: 'Vehicle',
      description: 'Parts replacement',
      amount: 680,
      date: '2024-10-28',
      status: 'Pending',
      paidDate: null,
      icon: Bike,
    },
  ];

  // Emergency contacts
  const emergencyContacts = [
    { name: 'Ambulance Service', number: '193', type: 'Emergency', icon: Truck },
    { name: 'Police Emergency', number: '191', type: 'Emergency', icon: Shield },
    { name: 'RiderGuy Support', number: '+233 50 123 4567', type: 'Support', icon: Phone },
    { name: 'Insurance Hotline', number: '+233 50 123 4580', type: 'Insurance', icon: FileText },
    { name: 'Mental Health Crisis', number: '+233 50 123 4568', type: 'Support', icon: Heart },
  ];

  // Wellness programs
  const wellnessPrograms = [
    {
      id: 1,
      title: 'Health Check-up Program',
      description: 'Free quarterly medical check-ups',
      icon: Stethoscope,
      participants: 847,
      nextEvent: '2024-12-15',
      status: 'Ongoing',
    },
    {
      id: 2,
      title: 'Fitness Challenge',
      description: 'Monthly fitness goals with rewards',
      icon: Activity,
      participants: 1230,
      nextEvent: '2024-12-01',
      status: 'Enrolling',
    },
    {
      id: 3,
      title: 'Mental Wellness Workshops',
      description: 'Stress management and mindfulness sessions',
      icon: Heart,
      participants: 456,
      nextEvent: '2024-11-28',
      status: 'Ongoing',
    },
    {
      id: 4,
      title: 'Family Support Program',
      description: 'Support services for rider families',
      icon: Users,
      participants: 623,
      nextEvent: '2024-12-10',
      status: 'Ongoing',
    },
  ];

  // Support requests history
  const supportRequests = [
    {
      id: 1,
      type: 'Financial Assistance',
      subject: 'Emergency loan request',
      date: '2024-11-20',
      status: 'Approved',
      response: 'Loan approved, funds disbursed',
      icon: DollarSign,
    },
    {
      id: 2,
      type: 'Legal Assistance',
      subject: 'Traffic incident consultation',
      date: '2024-11-18',
      status: 'Resolved',
      response: 'Legal advice provided, case closed',
      icon: Briefcase,
    },
    {
      id: 3,
      type: 'Medical Support',
      subject: 'Hospital bill assistance',
      date: '2024-11-15',
      status: 'Processing',
      response: 'Under review by welfare team',
      icon: Building2,
    },
  ];

  // Benefits eligible for
  const eligibleBenefits = [
    {
      id: 1,
      title: 'Maternity/Paternity Leave',
      description: '3 months paid leave for new parents',
      icon: Baby,
      eligible: true,
      value: 'Up to GH₵3,000',
    },
    {
      id: 2,
      title: 'Education Grant',
      description: 'Financial support for children\'s education',
      icon: GraduationCap,
      eligible: true,
      value: 'Up to GH₵2,000/year',
    },
    {
      id: 3,
      title: 'Housing Allowance',
      description: 'Monthly rent assistance for eligible riders',
      icon: Home,
      eligible: false,
      value: 'GH₵500/month',
      requirement: 'Requires 12 months service',
    },
    {
      id: 4,
      title: 'Vehicle Upgrade Grant',
      description: 'One-time assistance for bike upgrade',
      icon: Bike,
      eligible: true,
      value: 'Up to GH₵5,000',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'resolved':
      case 'active':
        return 'text-green-700 bg-green-100 border-green-300';
      case 'pending':
      case 'processing':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'rejected':
      case 'expired':
        return 'text-red-700 bg-red-100 border-red-300';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  return (
    <>
      <SEOHead
        title="Welfare & Support"
        description="Access insurance coverage, support services, and emergency assistance"
        keywords={['welfare', 'insurance', 'support', 'emergency', 'benefits']}
        canonicalPath="/dashboard/welfare"
      />
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Rider Welfare</h1>
          <p className="text-gray-600 mt-1">Your health, safety, and wellbeing matter to us</p>
        </div>
        <button
          onClick={() => setShowEmergency(true)}
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-600/30 animate-pulse"
        >
          <AlertCircle className="w-5 h-5" />
          Emergency
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 text-white">
          <Shield className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-sm opacity-90">Coverage</p>
          <p className="text-2xl font-black">{welfareStats.insuranceCoverage}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <DollarSign className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-sm opacity-90">Coverage Limit</p>
          <p className="text-2xl font-black">GH₵{(welfareStats.coverageAmount / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white">
          <FileText className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-sm opacity-90">Claims</p>
          <p className="text-2xl font-black">{welfareStats.claimsProcessed}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-5 text-white">
          <Users className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-sm opacity-90">Support Requests</p>
          <p className="text-2xl font-black">{welfareStats.supportRequests}</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-5 text-white">
          <Phone className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-sm opacity-90">Emergency Contacts</p>
          <p className="text-2xl font-black">{welfareStats.emergencyContacts}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-5 text-white">
          <Heart className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-sm opacity-90">Wellness Score</p>
          <p className="text-2xl font-black">{welfareStats.wellnessScore}%</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'insurance', label: 'Insurance', icon: Shield },
            { id: 'support', label: 'Support Services', icon: Heart },
            { id: 'claims', label: 'Claims', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Insurance Summary Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-12 h-12" />
                    <div>
                      <h2 className="text-2xl font-black">Insurance Coverage</h2>
                      <p className="text-sm opacity-90">{insuranceCoverage.provider}</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mt-3">
                    Policy: {insuranceCoverage.policyNumber}
                  </p>
                </div>
                <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <p className="text-sm opacity-90 mb-1">Total Coverage</p>
                  <p className="text-3xl font-black">GH₵{(welfareStats.coverageAmount / 1000).toFixed(0)}K</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <p className="text-sm opacity-90 mb-1">Monthly Premium</p>
                  <p className="text-3xl font-black">GH₵{insuranceCoverage.premium}</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <p className="text-sm opacity-90 mb-1">Valid Until</p>
                  <p className="text-xl font-black">{insuranceCoverage.expiryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-6 bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-red-300 hover:shadow-lg transition-all text-left">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                <Truck className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Emergency Help</h3>
              <p className="text-sm text-gray-600">24/7 emergency support</p>
            </button>
            <button className="p-6 bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">File a Claim</h3>
              <p className="text-sm text-gray-600">Submit insurance claim</p>
            </button>
            <button className="p-6 bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-green-300 hover:shadow-lg transition-all text-left">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Financial Help</h3>
              <p className="text-sm text-gray-600">Emergency loans</p>
            </button>
            <button className="p-6 bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Mental Health</h3>
              <p className="text-sm text-gray-600">Free counseling</p>
            </button>
          </div>

          {/* Wellness Programs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Wellness Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wellnessPrograms.map((program) => {
                const Icon = program.icon;
                return (
                  <div
                    key={program.id}
                    className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          program.status === 'Ongoing'
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        {program.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{program.participants} riders</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{program.nextEvent}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eligible Benefits */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Benefits You're Eligible For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eligibleBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.id}
                    className={`p-5 rounded-xl border-2 ${
                      benefit.eligible
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        benefit.eligible ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {benefit.eligible ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                    <p className="text-lg font-black text-blue-600">{benefit.value}</p>
                    {!benefit.eligible && benefit.requirement && (
                      <p className="text-xs text-gray-600 mt-2">{benefit.requirement}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'insurance' && (
        <div className="space-y-6">
          {/* Coverage Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceCoverage.coverageTypes.map((coverage) => {
              const Icon = coverage.icon;
              const usagePercentage = (coverage.used / coverage.limit) * 100;
              
              const bgColorClass = coverage.color === 'blue' ? 'bg-blue-100' :
                                   coverage.color === 'red' ? 'bg-red-100' :
                                   coverage.color === 'purple' ? 'bg-purple-100' :
                                   'bg-green-100';
              
              const iconColorClass = coverage.color === 'blue' ? 'text-blue-600' :
                                     coverage.color === 'red' ? 'text-red-600' :
                                     coverage.color === 'purple' ? 'text-purple-600' :
                                     'text-green-600';
              
              const progressColorClass = coverage.color === 'blue' ? 'bg-blue-600' :
                                        coverage.color === 'red' ? 'bg-red-600' :
                                        coverage.color === 'purple' ? 'bg-purple-600' :
                                        'bg-green-600';
              
              return (
                <div
                  key={coverage.type}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${bgColorClass} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${iconColorClass}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{coverage.type}</h3>
                        <p className="text-sm text-gray-600">Coverage Limit: GH₵{coverage.limit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Usage Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Used</span>
                      <span className="text-sm font-bold text-gray-900">
                        GH₵{coverage.used.toLocaleString()} / GH₵{coverage.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${progressColorClass} rounded-full transition-all`}
                        style={{ width: `${usagePercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {usagePercentage.toFixed(1)}% utilized
                    </p>
                  </div>

                  {/* Coverage Details */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Covers:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {coverage.details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Policy Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Policy Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Policy Number</p>
                  <p className="text-lg font-bold text-gray-900">{insuranceCoverage.policyNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="text-lg font-bold text-gray-900">{insuranceCoverage.startDate}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Payment Frequency</p>
                  <p className="text-lg font-bold text-gray-900">{insuranceCoverage.paymentFrequency}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Insurance Provider</p>
                  <p className="text-lg font-bold text-gray-900">{insuranceCoverage.provider}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                  <p className="text-lg font-bold text-gray-900">{insuranceCoverage.expiryDate}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Monthly Premium</p>
                  <p className="text-lg font-bold text-gray-900">GH₵{insuranceCoverage.premium}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Policy
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                Contact Provider
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'support' && (
        <div className="space-y-6">
          {/* Support Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportServices.map((service) => {
              const Icon = service.icon;
              
              const bgColorClass = service.color === 'red' ? 'bg-red-100' :
                                   service.color === 'pink' ? 'bg-pink-100' :
                                   service.color === 'blue' ? 'bg-blue-100' :
                                   service.color === 'green' ? 'bg-green-100' :
                                   service.color === 'orange' ? 'bg-orange-100' :
                                   'bg-purple-100';
              
              const iconColorClass = service.color === 'red' ? 'text-red-600' :
                                     service.color === 'pink' ? 'text-pink-600' :
                                     service.color === 'blue' ? 'text-blue-600' :
                                     service.color === 'green' ? 'text-green-600' :
                                     service.color === 'orange' ? 'text-orange-600' :
                                     'text-purple-600';
              
              const buttonBgClass = service.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                                   service.color === 'pink' ? 'bg-pink-600 hover:bg-pink-700' :
                                   service.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                                   service.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                                   service.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                                   'bg-purple-600 hover:bg-purple-700';
              
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${bgColorClass} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${iconColorClass}`} />
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {service.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700 font-semibold">{service.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Response: {service.responseTime}</span>
                    </div>
                  </div>
                  <button className={`w-full mt-4 px-4 py-2 ${buttonBgClass} text-white rounded-lg font-bold transition-colors`}>
                    Request Support
                  </button>
                </div>
              );
            })}
          </div>

          {/* Support Request History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Support Requests</h2>
            <div className="space-y-3">
              {supportRequests.map((request) => {
                const Icon = request.icon;
                return (
                  <div
                    key={request.id}
                    className="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">{request.subject}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border-2 ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{request.type}</p>
                          <p className="text-sm text-gray-700 mb-2">{request.response}</p>
                          <p className="text-xs text-gray-600">{request.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'claims' && (
        <div className="space-y-6">
          {/* File New Claim Button */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black mb-2">Need to File a Claim?</h2>
                <p className="text-sm opacity-90">Submit your insurance claim in minutes</p>
              </div>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Claim
              </button>
            </div>
          </div>

          {/* Claims History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Claims History</h2>
            <div className="space-y-4">
              {recentClaims.map((claim) => {
                const Icon = claim.icon;
                return (
                  <div
                    key={claim.id}
                    className="p-5 bg-gray-50 rounded-xl hover:shadow-md transition-all border-2 border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-900">{claim.description}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(claim.status)}`}>
                              {claim.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="font-semibold">{claim.type}</span>
                            <span>•</span>
                            <span>Filed: {claim.date}</span>
                            {claim.paidDate && (
                              <>
                                <span>•</span>
                                <span>Paid: {claim.paidDate}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-green-600">GH₵{claim.amount}</p>
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Claim Process Guide */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How to File a Claim</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Gather Documents', description: 'Collect all relevant receipts and documentation' },
                { step: 2, title: 'Submit Claim', description: 'Fill out the claim form with details' },
                { step: 3, title: 'Review Process', description: 'Our team reviews within 2-3 business days' },
                { step: 4, title: 'Get Paid', description: 'Approved claims paid within 5 business days' },
              ].map((step) => (
                <div key={step.step} className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      {showEmergency && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowEmergency(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white rounded-t-3xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-10 h-10" />
                  <div>
                    <h2 className="text-2xl font-black">Emergency Contacts</h2>
                    <p className="text-sm opacity-90">24/7 support available</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEmergency(false)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {emergencyContacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={index}
                    href={`tel:${contact.number}`}
                    className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-red-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-black text-gray-900">{contact.number}</p>
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white rounded-t-3xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black mb-1">{selectedService.title}</h2>
                  <p className="text-sm opacity-90">{selectedService.description}</p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Contact</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedService.contact}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Response Time</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedService.responseTime}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Available Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedService.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Request Support Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
