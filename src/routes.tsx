import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { RiderLayout } from '@/layouts/RiderLayout';
import { MerchantLayout } from '@/layouts/MerchantLayout';

// Guards
import { RequireAuth } from '@/guards/RequireAuth';
import { RequireRole } from '@/guards/RequireRole';

// Public Pages
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { ServicesPage } from '@/pages/public/ServicesPage';
import { BookParcelPage } from '@/pages/public/BookParcelPage';
import { TrackPage } from '@/pages/public/TrackPage';
import { RatesPage } from '@/pages/public/RatesPage';
import { CoveragePage } from '@/pages/public/CoveragePage';
import { ContactPage } from '@/pages/public/ContactPage';
import { FaqPage } from '@/pages/public/FaqPage';
import { TermsPage } from '@/pages/public/TermsPage';
import { PrivacyPage } from '@/pages/public/PrivacyPage';
import { SupportPage } from '@/pages/public/SupportPage';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';

// Admin Pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { ModulePlaceholderPage } from '@/pages/common/ModulePlaceholderPage';

// Rider Pages
import { RiderTasksPage } from '@/pages/rider/RiderTasksPage';
import { RiderCashPage } from '@/pages/rider/RiderCashPage';
import { RiderProfilePage } from '@/pages/rider/RiderProfilePage';

// Error Pages
import { NotFoundPage } from '@/pages/errors/NotFoundPage';
import { ForbiddenPage } from '@/pages/errors/ForbiddenPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/book" element={<BookParcelPage />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/track/:trackingNo" element={<TrackPage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/coverage" element={<CoveragePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
      </Route>

      {/* Admin Portal (Guarded by super_admin, ops_manager, branch_staff, finance) */}
      <Route
        element={
          <RequireAuth>
            <RequireRole allowedRoles={['super_admin', 'ops_manager', 'branch_staff', 'finance']}>
              <AdminLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route
          path="/admin/shipments"
          element={<ModulePlaceholderPage title="Consignment Shipments" moduleName="Shipments" />}
        />
        <Route
          path="/admin/pickups"
          element={<ModulePlaceholderPage title="Pickup Schedule & Assign" moduleName="Pickups" />}
        />
        <Route
          path="/admin/customers"
          element={<ModulePlaceholderPage title="Customer Accounts" moduleName="Customers" />}
        />
        <Route
          path="/admin/merchants"
          element={<ModulePlaceholderPage title="E-Commerce Merchants" moduleName="Merchants" />}
        />
        <Route
          path="/admin/riders-staff"
          element={<ModulePlaceholderPage title="Riders & Operations Staff" moduleName="Riders & Staff" />}
        />
        <Route
          path="/admin/branches-hubs"
          element={<ModulePlaceholderPage title="Hubs & Distribution Centers" moduleName="Branches & Hubs" />}
        />
        <Route
          path="/admin/cities-zones"
          element={<ModulePlaceholderPage title="Coverage Cities & Delivery Zones" moduleName="Cities & Zones" />}
        />
        <Route
          path="/admin/rates"
          element={<ModulePlaceholderPage title="Tariff Rate Cards" moduleName="Shipping Rates" />}
        />
        <Route
          path="/admin/finance"
          element={<ModulePlaceholderPage title="Cash on Delivery (COD) & Payouts" moduleName="COD & Finance" />}
        />
        <Route
          path="/admin/returns"
          element={<ModulePlaceholderPage title="Returns & Exception Center" moduleName="Returns & Exceptions" />}
        />
        <Route
          path="/admin/reports"
          element={<ModulePlaceholderPage title="Analytics & Operational Reports" moduleName="Reports" />}
        />
        <Route
          path="/admin/notifications"
          element={<ModulePlaceholderPage title="Broadcasts & System Alerts" moduleName="Notifications" />}
        />
        <Route
          path="/admin/support"
          element={<ModulePlaceholderPage title="Customer Support Tickets" moduleName="Support Tickets" />}
        />
        <Route
          path="/admin/settings"
          element={<ModulePlaceholderPage title="System & Company Settings" moduleName="Settings" />}
        />
        <Route
          path="/admin/permissions"
          element={<ModulePlaceholderPage title="Roles & Access Control" moduleName="Users & Permissions" />}
        />
        <Route
          path="/admin/audit-logs"
          element={<ModulePlaceholderPage title="Audit Trail & Security Logs" moduleName="Audit Logs" />}
        />
      </Route>

      {/* Rider Portal (Mobile-First, Guarded by rider) */}
      <Route
        element={
          <RequireAuth>
            <RequireRole allowedRoles={['rider']}>
              <RiderLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route path="/rider" element={<RiderTasksPage />} />
        <Route path="/rider/cash" element={<RiderCashPage />} />
        <Route path="/rider/profile" element={<RiderProfilePage />} />
      </Route>

      {/* Merchant Portal (Guarded by merchant + feature flag) */}
      <Route
        element={
          <RequireAuth>
            <RequireRole allowedRoles={['merchant']}>
              <MerchantLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route
          path="/merchant"
          element={<ModulePlaceholderPage title="Merchant Portal" moduleName="Merchant Overview" />}
        />
        <Route
          path="/merchant/shipments"
          element={<ModulePlaceholderPage title="Merchant Shipments" moduleName="Merchant Shipments" />}
        />
        <Route
          path="/merchant/pickups"
          element={<ModulePlaceholderPage title="Bulk Pickup Requests" moduleName="Merchant Pickups" />}
        />
        <Route
          path="/merchant/cod"
          element={<ModulePlaceholderPage title="COD Statements & Remittances" moduleName="COD & Payouts" />}
        />
        <Route
          path="/merchant/settings"
          element={<ModulePlaceholderPage title="Merchant API Keys & Webhooks" moduleName="Merchant Settings" />}
        />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
