import React from 'react';
import {ScrollView} from 'react-native';
import Typography from '../../../components/Typography';
import {scale, verticalScale} from '../../../shared/Scaling';
import {ITermsOfUse} from '../../../@types/routes';

const TermsOfUse: ITermsOfUse = () => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{
        padding: scale(20),
        paddingBottom: verticalScale(40),
      }}>
      <Typography fontWeight="bold" size="lg" marginBottom={scale(20)}>
        Introduction
      </Typography>

      <Typography size="md" color="black" marginBottom={scale(20)}>
        TERMS OF USE FOR DAILY HELP
      </Typography>

      <Typography size="md" color="black" marginBottom={scale(20)}>
        These Terms of Use (“Terms”) govern your access to and use of our mobile application, website, and related services (collectively, the “Platform”). By accessing or using the Platform in the Federal Republic of Nigeria, you agree to be legally bound by these Terms in accordance with Nigerian law. If you do not agree, discontinue use immediately.
      </Typography>

      <Typography size="md" color="black" marginBottom={scale(20)}>
        These Terms are interpreted in compliance with Nigerian data protection, consumer protection, and labor laws.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        1. DEFINITIONS
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        For purposes of these Terms:
        {'\n'}• “Company” means DAILY HELP INTERNATIONAL, the owner and operator of the Platform.
        {'\n'}• “Platform” means the mobile application, website, and related services provided by the Company.
        {'\n'}• “Client” means any person who requests services through the Platform.
        {'\n'}• “Service Provider” means any independent contractor (artisan, babysitter, housekeeper, usher, etc.) offering services via the Platform.
        {'\n'}• “User” means any person accessing the Platform, including Clients, Service Providers, or visitors.
        {'\n'}• “Fees/Commission” means any charges the Company collects for the use of the Platform, including service fees, commissions, or other platform fees.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        2. GENERAL APPLICATION
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        These Terms apply to:
        {'\n'}• All users accessing the Platform
        {'\n'}• Clients requesting services
        {'\n'}• Service Providers offering services
        {'\n'}• Visitors browsing the Platform without creating an account
        {'\n'}{'\n'}
        The Platform operates as a technology-enabled marketplace, connecting Clients and Independent Service Providers. The Company does not provide the services directly unless explicitly stated in writing and is not responsible for service performance or quality.
        {'\n'}{'\n'}
        For Nigerian operations, the Platform functions strictly as an intermediary technology provider and does not assume employer liability for independent contractors.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        3. ELIGIBILITY
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        To use the Platform, Users must:
        {'\n'}• Be at least 18 years old
        {'\n'}• Provide accurate, complete, and current registration information
        {'\n'}• Not use the Platform for unlawful purposes
        {'\n'}• Ensure Service Providers meet all applicable licensing, tax, qualification, and regulatory requirements under Nigerian law
        {'\n'}{'\n'}
        The Company reserves the right to suspend or terminate accounts in breach of these Terms or any applicable Nigerian regulation.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        4. ACCOUNT REGISTRATION & SECURITY
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        Users are responsible for:
        {'\n'}• Maintaining confidentiality of login credentials
        {'\n'}• All activities under their account
        {'\n'}• Prompt notification of unauthorized access
        {'\n'}{'\n'}
        The Company is not liable for losses resulting from failure to safeguard login credentials.
        {'\n'}{'\n'}
        Where identity verification is required for fraud prevention or regulatory compliance, users consent to verification consistent with Nigerian anti-fraud regulations.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        5. NATURE OF THE PLATFORM
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        The Company:
        {'\n'}• Facilitates introductions between Clients and Independent Service Providers
        {'\n'}• Does not supervise, control, or direct the performance of services
        {'\n'}• Does not employ Service Providers unless expressly stated
        {'\n'}{'\n'}
        All Service Providers operate as independent contractors, not employees, agents, or representatives of the Company under Nigerian labor law.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        6. PAYMENTS & FEES
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        • Service Pricing: Service Providers set their service prices. Clients pay the price displayed at booking.
        {'\n'}• Platform Commission: The Platform collects a commission on each service transaction, which is split between the Service Provider and the Service Seeker.
        {'\n'}• The applicable commission rates are displayed to both parties before confirming the booking.
        {'\n'}• Users agree to pay the commission as displayed at the time of transaction.
        {'\n'}• Additional Fees: The Company may charge additional platform fees or service charges, which will also be displayed at the time of booking.
        {'\n'}• Payment Processing: All payments are processed via approved third-party payment providers. The Company is not responsible for banking errors, third-party failures, delays from Nigerian financial institutions, or system disruptions beyond its control.
        {'\n'}• Taxes: Service Providers are solely responsible for compliance with Nigerian tax law.
        {'\n'}• The Company is not responsible for calculating or remit ting taxes on behalf of Users
        {'\n'}• Refunds & Adjustments: Refunds or adjustments are governed by the Platform’s Refund Policy, if applicable.
        {'\n'}• Any changes to pricing or fees will be clearly displayed prior to transaction confirmation.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        7. USER CONDUCT
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        Users agree not to:
        {'\n'}• Provide false or misleading information
        {'\n'}• Engage in harassment, abuse, or discrimination
        {'\n'}• Circumvent the Platform to avoid fees
        {'\n'}• Use the Platform for fraudulent, illegal, or harmful activities
        {'\n'}{'\n'}
        Violations may result in account suspension, termination, and reporting to Nigerian law enforcement authorities.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        8. DISCLAIMERS
      </Typography>
      <Typography fontWeight="bold" size="md" marginBottom={scale(5)}>
        8.1 Service Disclaimer
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(10)}>
        The Platform is provided “as is” and “as available”. The Company does not guarantee:
        {'\n'}• Continuous availability
        {'\n'}• Error-free functionality
        {'\n'}• Suitability or performance of Service Providers
        {'\n'}• Specific results from services rendered
        {'\n'}{'\n'}
        Clients are responsible for evaluating Service Providers before engagement.
      </Typography>

      <Typography fontWeight="bold" size="md" marginBottom={scale(5)}>
        8.2 App Maintenance & Downtime
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(10)}>
        The Company may:
        {'\n'}• Perform scheduled or emergency maintenance
        {'\n'}• Update, suspend, or discontinue features
        {'\n'}• Experience technical interruptions beyond its control
        {'\n'}{'\n'}
        The Company is not liable for losses arising from: server downtime, system failures, internet disruptions, cybersecurity incidents despite reasonable safeguards, power outages, or telecommunications failures in Nigeria.
      </Typography>

      <Typography fontWeight="bold" size="md" marginBottom={scale(5)}>
        8.3 Limitation of Liability
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        To the fullest extent permitted under Nigerian law:
        {'\n'}• The Company is not liable for indirect, incidental, or consequential damages, loss of profits, data, goodwill, or disputes between Clients and Service Providers.
        {'\n'}• Total liability shall not exceed the amount paid by the user in the preceding three months.
        {'\n'}• Nothing in this clause excludes liability that cannot be excluded under Nigerian law.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        9. DATA PROCESSING & USER CONSENT (NDPR / NDPA COMPLIANT)
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        By using the Platform, Users consent to:
        {'\n'}• Collection and processing of personal data (name, contact details, location, service preferences)
        {'\n'}• Payment-related processing
        {'\n'}• Communication via email, SMS, or in-app notifications
        {'\n'}{'\n'}
        Data may be processed for: identity verification, background screening (where applicable), fraud prevention, and service improvement analytics.
        {'\n'}{'\n'}
        Data processing complies with:
        {'\n'}• Nigeria Data Protection Regulation (NDPR) 2019
        {'\n'}• Nigeria Data Protection Act (NDPA) 2023
        {'\n'}{'\n'}
        Processing is based on:
        {'\n'}• User consent
        {'\n'}• Performance of contract
        {'\n'}• Legal obligation
        {'\n'}• Legitimate business interest
        {'\n'}{'\n'}
        Users may withdraw consent subject to statutory limitations.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        10. PRIVACY & DATA SECURITY
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        • Data Collected: Personal identification, device/technical data, usage analytics, location (if enabled), payment info via third-party processors
        {'\n'}{'\n'}
        • Use: Facilitate bookings, improve services, prevent fraud, customer support, legal compliance
        {'\n'}{'\n'}
        • Storage & Security: Encryption, secure servers, access controls, periodic reviews. Users acknowledge inherent digital risks.
        {'\n'}{'\n'}
        • Retention: Data retained as necessary for operational or legal purposes, or until deletion request is processed.
        {'\n'}{'\n'}
        • User Rights: Access, correction, deletion, withdrawal of consent, objection to processing, restriction, complaint to NITDA
        {'\n'}{'\n'}
        • Cross-Border Transfers: Allowed only with adequate safeguards, contracts, or explicit consent
        {'\n'}{'\n'}
        • Breach Notification: Prompt risk assessment, regulatory notification, and affected user notification
        {'\n'}{'\n'}
        • Child Data: Platform not intended for under 18; parental consent required for minor-related services
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        11. COOKIE POLICY
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        • Cookies used to maintain sessions, improve performance, analyze traffic, personalize experience
        {'\n'}• Users can manage cookies via browser settings
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        12. INTELLECTUAL PROPERTY
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        All content (logos, designs, software, branding) remains the Company’s exclusive property and is protected under Nigerian law. Users may not copy, distribute, or reproduce without authorization.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        13. TERMINATION
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        The Company may:
        {'\n'}• Suspend or terminate accounts
        {'\n'}• Remove content
        {'\n'}• Deny access for violations of these Terms or unlawful conduct
        {'\n'}{'\n'}
        Termination does not affect accrued rights or obligations.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        14. GOVERNING LAW & DISPUTE RESOLUTION
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        • Governed by Federal Republic of Nigeria laws
        {'\n'}• Disputes resolved in order of:
        {'\n'}1. Good faith negotiation
        {'\n'}2. Mediation within Nigeria
        {'\n'}3. Arbitration under the Arbitration and Conciliation Act, Cap A18, LFN 2004
        {'\n'}4. Competent Nigerian courts (High Court with jurisdiction)
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        15. AMENDMENTS
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        • Company may update Terms in compliance with Nigerian regulations
        {'\n'}• Users will be notified via email or in-app notification
        {'\n'}• Continued use after updates constitutes acceptance of revised terms
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        16. CONTACT INFORMATION
      </Typography>
      <Typography size="md" color="black" marginBottom={scale(20)}>
        For legal or privacy inquiries:
        {'\n'}{'\n'}
        DailyHelp technology
        {'\n'}{'\n'}
        Dailyhelptechintl@gmail.com
        {'\n'}+2348146090398
      </Typography>
    </ScrollView>
  );
};

export default TermsOfUse;
