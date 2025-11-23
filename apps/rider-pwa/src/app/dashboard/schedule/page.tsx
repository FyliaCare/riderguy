'use client';

import { SEOHead } from '@/components/seo-head';
import { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  MapPin,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Download,
  Filter,
  Search,
  Users,
  Zap,
  Target,
  BarChart3,
  Settings,
} from 'lucide-react';

export default function SchedulePage() {
  const [selectedView, setSelectedView] = useState<'week' | 'month' | 'list'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddShift, setShowAddShift] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);

  // Schedule stats
  const scheduleStats = {
    hoursScheduled: 42,
    shiftsPlanned: 18,
    earnings: 3240,
    availability: 95,
    acceptanceRate: 92,
    peakHoursBooked: 12,
  };

  // Shifts data
  const shifts = [
    {
      id: 1,
      date: '2024-11-23',
      dayName: 'Saturday',
      type: 'morning',
      startTime: '08:00',
      endTime: '12:00',
      duration: '4h',
      zone: 'Accra Central',
      status: 'confirmed',
      estimatedEarnings: 180,
      orders: 12,
      peakHours: true,
    },
    {
      id: 2,
      date: '2024-11-23',
      dayName: 'Saturday',
      type: 'afternoon',
      startTime: '13:00',
      endTime: '17:00',
      duration: '4h',
      zone: 'Osu',
      status: 'confirmed',
      estimatedEarnings: 200,
      orders: 15,
      peakHours: true,
    },
    {
      id: 3,
      date: '2024-11-24',
      dayName: 'Sunday',
      type: 'morning',
      startTime: '09:00',
      endTime: '13:00',
      duration: '4h',
      zone: 'East Legon',
      status: 'available',
      estimatedEarnings: 160,
      orders: 0,
      peakHours: false,
    },
    {
      id: 4,
      date: '2024-11-24',
      dayName: 'Sunday',
      type: 'evening',
      startTime: '18:00',
      endTime: '22:00',
      duration: '4h',
      zone: 'Accra Central',
      status: 'confirmed',
      estimatedEarnings: 220,
      orders: 18,
      peakHours: true,
    },
    {
      id: 5,
      date: '2024-11-25',
      dayName: 'Monday',
      type: 'morning',
      startTime: '07:00',
      endTime: '11:00',
      duration: '4h',
      zone: 'Airport Area',
      status: 'pending',
      estimatedEarnings: 190,
      orders: 0,
      peakHours: true,
    },
    {
      id: 6,
      date: '2024-11-25',
      dayName: 'Monday',
      type: 'lunch',
      startTime: '11:30',
      endTime: '14:30',
      duration: '3h',
      zone: 'Cantonments',
      status: 'confirmed',
      estimatedEarnings: 150,
      orders: 10,
      peakHours: true,
    },
    {
      id: 7,
      date: '2024-11-26',
      dayName: 'Tuesday',
      type: 'afternoon',
      startTime: '14:00',
      endTime: '18:00',
      duration: '4h',
      zone: 'Tema',
      status: 'available',
      estimatedEarnings: 170,
      orders: 0,
      peakHours: false,
    },
    {
      id: 8,
      date: '2024-11-27',
      dayName: 'Wednesday',
      type: 'full-day',
      startTime: '08:00',
      endTime: '17:00',
      duration: '9h',
      zone: 'Multiple Zones',
      status: 'confirmed',
      estimatedEarnings: 450,
      orders: 28,
      peakHours: true,
    },
  ];

  // Shift templates
  const shiftTemplates = [
    {
      id: 1,
      name: 'Morning Rush',
      icon: Sunrise,
      time: '7:00 AM - 11:00 AM',
      duration: '4h',
      bestZones: ['Airport', 'Business District'],
      avgEarnings: 190,
      color: 'orange',
    },
    {
      id: 2,
      name: 'Lunch Peak',
      icon: Sun,
      time: '11:30 AM - 2:30 PM',
      duration: '3h',
      bestZones: ['Commercial Areas', 'CBD'],
      avgEarnings: 150,
      color: 'yellow',
    },
    {
      id: 3,
      name: 'Afternoon Steady',
      icon: Sun,
      time: '2:00 PM - 6:00 PM',
      duration: '4h',
      bestZones: ['Residential', 'Mixed Areas'],
      avgEarnings: 170,
      color: 'blue',
    },
    {
      id: 4,
      name: 'Evening Peak',
      icon: Sunset,
      time: '6:00 PM - 10:00 PM',
      duration: '4h',
      bestZones: ['Restaurant Districts', 'Entertainment'],
      avgEarnings: 220,
      color: 'purple',
    },
    {
      id: 5,
      name: 'Night Shift',
      icon: Moon,
      time: '10:00 PM - 2:00 AM',
      duration: '4h',
      bestZones: ['24hr Areas', 'Late Night'],
      avgEarnings: 200,
      color: 'indigo',
    },
  ];

  // Availability patterns
  const availabilityPatterns = [
    { day: 'Monday', morning: true, afternoon: true, evening: true, night: false },
    { day: 'Tuesday', morning: true, afternoon: true, evening: true, night: false },
    { day: 'Wednesday', morning: true, afternoon: false, evening: true, night: false },
    { day: 'Thursday', morning: true, afternoon: true, evening: true, night: false },
    { day: 'Friday', morning: true, afternoon: true, evening: true, night: true },
    { day: 'Saturday', morning: true, afternoon: true, evening: true, night: true },
    { day: 'Sunday', morning: false, afternoon: true, evening: true, night: false },
  ];

  // Recommended shifts based on performance
  const recommendedShifts = [
    {
      id: 1,
      date: '2024-11-28',
      dayName: 'Thursday',
      time: '11:30 AM - 2:30 PM',
      zone: 'Osu',
      reason: 'High demand area during your best performance time',
      potentialEarnings: 180,
      probability: 95,
    },
    {
      id: 2,
      date: '2024-11-29',
      dayName: 'Friday',
      time: '6:00 PM - 10:00 PM',
      zone: 'Airport',
      reason: 'Peak evening hours with 30% bonus',
      potentialEarnings: 250,
      probability: 88,
    },
    {
      id: 3,
      date: '2024-11-30',
      dayName: 'Saturday',
      time: '8:00 AM - 12:00 PM',
      zone: 'East Legon',
      reason: 'Weekend morning rush in premium area',
      potentialEarnings: 200,
      probability: 92,
    },
  ];

  // Week days for calendar
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate calendar dates
  const generateWeekDates = () => {
    const dates = [];
    const today = new Date(selectedDate);
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = generateWeekDates();

  const getShiftIcon = (type: string) => {
    switch (type) {
      case 'morning':
        return Sunrise;
      case 'lunch':
        return Sun;
      case 'afternoon':
        return Sun;
      case 'evening':
        return Sunset;
      case 'night':
        return Moon;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'available':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getShiftsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return shifts.filter((shift) => shift.date === dateStr);
  };

  return (
    <>
      <SEOHead
        title="Schedule"
        description="Plan your shifts, set availability, and manage your work schedule"
        keywords={['schedule', 'shifts', 'calendar', 'availability', 'planning']}
        canonicalPath="/dashboard/schedule"
      />
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-1">Plan your shifts and manage availability</p>
        </div>
        <button
          onClick={() => setShowAddShift(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-600/30"
        >
          <Plus className="w-5 h-5" />
          Add Shift
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <Clock className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{scheduleStats.hoursScheduled}h</p>
          <p className="text-sm opacity-90">This Week</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white">
          <Calendar className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{scheduleStats.shiftsPlanned}</p>
          <p className="text-sm opacity-90">Shifts Planned</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 text-white">
          <DollarSign className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">GH₵{scheduleStats.earnings}</p>
          <p className="text-sm opacity-90">Est. Earnings</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-5 text-white">
          <Target className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{scheduleStats.availability}%</p>
          <p className="text-sm opacity-90">Availability</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-5 text-white">
          <CheckCircle2 className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{scheduleStats.acceptanceRate}%</p>
          <p className="text-sm opacity-90">Accept Rate</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-5 text-white">
          <Zap className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{scheduleStats.peakHoursBooked}</p>
          <p className="text-sm opacity-90">Peak Hours</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[
              { id: 'week', label: 'Week View' },
              { id: 'month', label: 'Month View' },
              { id: 'list', label: 'List View' },
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id as any)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedView === view.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>

          {/* Date Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 7);
                setSelectedDate(newDate);
              }}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="text-center min-w-[150px]">
              <p className="font-bold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 7);
                setSelectedDate(newDate);
              }}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Week View Calendar */}
      {selectedView === 'week' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDates.map((date, index) => {
              const isToday = formatDate(date) === formatDate(new Date());
              return (
                <div
                  key={index}
                  className={`p-4 text-center border-r border-gray-200 last:border-r-0 ${
                    isToday ? 'bg-green-50' : ''
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-600">{weekDays[index]}</p>
                  <p
                    className={`text-2xl font-black mt-1 ${
                      isToday ? 'text-green-600' : 'text-gray-900'
                    }`}
                  >
                    {date.getDate()}
                  </p>
                  {isToday && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">
                      Today
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Calendar Body */}
          <div className="grid grid-cols-7">
            {weekDates.map((date, index) => {
              const dayShifts = getShiftsForDate(date);
              return (
                <div
                  key={index}
                  className="min-h-[400px] p-3 border-r border-gray-200 last:border-r-0 bg-gray-50"
                >
                  <div className="space-y-2">
                    {dayShifts.length === 0 ? (
                      <div className="h-full flex items-center justify-center py-8">
                        <p className="text-sm text-gray-400">No shifts</p>
                      </div>
                    ) : (
                      dayShifts.map((shift) => {
                        const ShiftIcon = getShiftIcon(shift.type);
                        return (
                          <div
                            key={shift.id}
                            onClick={() => setSelectedShift(shift)}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getStatusColor(
                              shift.status
                            )}`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <ShiftIcon className="w-4 h-4" />
                              <span className="text-xs font-bold">
                                {shift.startTime} - {shift.endTime}
                              </span>
                            </div>
                            <p className="text-sm font-semibold mb-1">{shift.zone}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">GH₵{shift.estimatedEarnings}</span>
                              {shift.peakHours && (
                                <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {selectedView === 'list' && (
        <div className="space-y-4">
          {shifts.map((shift) => {
            const ShiftIcon = getShiftIcon(shift.type);
            return (
              <div
                key={shift.id}
                onClick={() => setSelectedShift(shift)}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        shift.status === 'confirmed'
                          ? 'bg-green-100'
                          : shift.status === 'pending'
                          ? 'bg-yellow-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      <ShiftIcon
                        className={`w-8 h-8 ${
                          shift.status === 'confirmed'
                            ? 'text-green-600'
                            : shift.status === 'pending'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">{shift.dayName}</h3>
                        <span className="text-sm text-gray-600">{shift.date}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {shift.startTime} - {shift.endTime} ({shift.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{shift.zone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Est. Earnings</p>
                      <p className="text-2xl font-black text-green-600">
                        GH₵{shift.estimatedEarnings}
                      </p>
                      {shift.orders > 0 && (
                        <p className="text-xs text-gray-600">{shift.orders} orders</p>
                      )}
                    </div>
                    <div>
                      <span
                        className={`px-4 py-2 rounded-lg font-semibold text-sm border-2 ${getStatusColor(
                          shift.status
                        )}`}
                      >
                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                      </span>
                      {shift.peakHours && (
                        <div className="flex items-center gap-1 mt-2 text-orange-600">
                          <Zap className="w-4 h-4 fill-orange-600" />
                          <span className="text-xs font-semibold">Peak Hours</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Month View */}
      {selectedView === 'month' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Month view coming soon</p>
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shift Templates */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Shift Templates</h2>
          <div className="space-y-3">
            {shiftTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className={`p-4 bg-${template.color}-50 rounded-xl border border-${template.color}-200 hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${template.color}-500 rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Avg. Earnings</p>
                      <p className="text-lg font-black text-green-600">GH₵{template.avgEarnings}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Shifts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended for You</h2>
          <div className="space-y-4">
            {recommendedShifts.map((shift) => (
              <div
                key={shift.id}
                className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {shift.dayName}, {shift.date}
                    </h3>
                    <p className="text-sm text-gray-600">{shift.time}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-600" />
                      <span className="text-sm text-gray-600">{shift.zone}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-green-600">
                      GH₵{shift.potentialEarnings}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-semibold text-green-600">
                        {shift.probability}% match
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white/80 rounded-lg mb-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">Why recommended:</span> {shift.reason}
                  </p>
                </div>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
                  Book This Shift
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Availability Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Weekly Availability</h2>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Edit
          </button>
        </div>
        <div className="space-y-3">
          {availabilityPatterns.map((pattern) => (
            <div
              key={pattern.day}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <span className="font-semibold text-gray-900 w-32">{pattern.day}</span>
              <div className="flex gap-2 flex-1">
                <div
                  className={`flex-1 p-3 rounded-lg text-center font-semibold text-sm ${
                    pattern.morning
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Sunrise className="w-4 h-4 mx-auto mb-1" />
                  Morning
                </div>
                <div
                  className={`flex-1 p-3 rounded-lg text-center font-semibold text-sm ${
                    pattern.afternoon
                      ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Sun className="w-4 h-4 mx-auto mb-1" />
                  Afternoon
                </div>
                <div
                  className={`flex-1 p-3 rounded-lg text-center font-semibold text-sm ${
                    pattern.evening
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Sunset className="w-4 h-4 mx-auto mb-1" />
                  Evening
                </div>
                <div
                  className={`flex-1 p-3 rounded-lg text-center font-semibold text-sm ${
                    pattern.night
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Moon className="w-4 h-4 mx-auto mb-1" />
                  Night
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shift Detail Modal */}
      {selectedShift && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedShift(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 text-white rounded-t-3xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black mb-1">{selectedShift.dayName}</h2>
                  <p className="text-sm opacity-90">{selectedShift.date}</p>
                </div>
                <button
                  onClick={() => setSelectedShift(null)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    selectedShift.status === 'confirmed'
                      ? 'bg-white/20'
                      : selectedShift.status === 'pending'
                      ? 'bg-yellow-400 text-yellow-900'
                      : 'bg-blue-400 text-blue-900'
                  }`}
                >
                  {selectedShift.status.charAt(0).toUpperCase() + selectedShift.status.slice(1)}
                </span>
                {selectedShift.peakHours && (
                  <span className="px-3 py-1 bg-orange-400 text-orange-900 rounded-full text-sm font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Peak Hours
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Time and Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Time</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedShift.startTime} - {selectedShift.endTime}
                  </p>
                  <p className="text-sm text-gray-600">{selectedShift.duration}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-gray-600">Zone</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedShift.zone}</p>
                </div>
              </div>

              {/* Earnings */}
              <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Earnings</p>
                    <p className="text-3xl font-black text-green-600">
                      GH₵{selectedShift.estimatedEarnings}
                    </p>
                  </div>
                  {selectedShift.orders > 0 && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Expected Orders</p>
                      <p className="text-3xl font-black text-gray-900">{selectedShift.orders}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedShift.status === 'available' && (
                  <button className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
                    Book This Shift
                  </button>
                )}
                {selectedShift.status === 'pending' && (
                  <>
                    <button className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Confirm
                    </button>
                    <button className="flex-1 px-6 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <X className="w-5 h-5" />
                      Decline
                    </button>
                  </>
                )}
                {selectedShift.status === 'confirmed' && (
                  <>
                    <button className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Edit2 className="w-5 h-5" />
                      Modify
                    </button>
                    <button className="px-6 py-4 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
