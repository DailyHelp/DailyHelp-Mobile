import React from 'react';
import {ScrollView, View} from 'react-native';
import Typography from '../../../components/Typography';
import {scale, verticalScale} from '../../../shared/Scaling';
import {ITermsOfUse} from '../../../@types/routes';

const ListItem = ({
  bullet,
  text,
  marginBottom,
}: {
  bullet: string;
  text: string;
  marginBottom?: number;
}) => (
  <View style={{flexDirection: 'row', marginBottom: marginBottom || scale(12)}}>
    <View style={{width: scale(25)}}>
      <Typography
        size="md"
        lineHeight={verticalScale(24)}
        color="black"
        fontWeight="medium">
        {bullet}
      </Typography>
    </View>
    <View style={{flex: 1}}>
      <Typography size="md" lineHeight={verticalScale(24)} color="black">
        {text}
      </Typography>
    </View>
  </View>
);

const TermsOfUse: ITermsOfUse = () => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{
        padding: scale(20),
        paddingTop: verticalScale(40),
        paddingBottom: verticalScale(40),
      }}>
      <Typography
        fontWeight="bold"
        size="lg"
        lineHeight={verticalScale(32)}
        marginBottom={scale(20)}>
        Introduction
      </Typography>

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
        TERMS OF USE FOR DAILY HELP
      </Typography>

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
        These Terms of Use (“Terms”) govern your access to and use of our mobile application, website, and related services (collectively, the “Platform”). By accessing or using the Platform in the Federal Republic of Nigeria, you agree to be legally bound by these Terms in accordance with Nigerian law. If you do not agree, discontinue use immediately.
      </Typography>

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(40)}>
        These Terms are interpreted in compliance with Nigerian data protection, consumer protection, and labor laws.
      </Typography>

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        1. DEFINITIONS
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        For purposes of these Terms:
      </Typography>
      <ListItem
        bullet="•"
        text="“Company” means DAILY HELP INTERNATIONAL, the owner and operator of the Platform."
      />
      <ListItem
        bullet="•"
        text="“Platform” means the mobile application, website, and related services provided by the Company."
      />
      <ListItem
        bullet="•"
        text="“Client” means any person who requests services through the Platform."
      />
      <ListItem
        bullet="•"
        text="“Service Provider” means any independent contractor (artisan, babysitter, housekeeper, usher, etc.) offering services via the Platform."
      />
      <ListItem
        bullet="•"
        text="“User” means any person accessing the Platform, including Clients, Service Providers, or visitors."
      />
      <ListItem
        bullet="•"
        text="“Fees/Commission” means any charges the Company collects for the use of the Platform, including service fees, commissions, or other platform fees."
        marginBottom={scale(30)}
      />

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        2. GENERAL APPLICATION
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        These Terms apply to:
      </Typography>
      <ListItem bullet="•" text="All users accessing the Platform" />
      <ListItem bullet="•" text="Clients requesting services" />
      <ListItem bullet="•" text="Service Providers offering services" />
      <ListItem
        bullet="•"
        text="Visitors browsing the Platform without creating an account"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
        The Platform operates as a technology-enabled marketplace, connecting Clients and Independent Service Providers. The Company does not provide the services directly unless explicitly stated in writing and is not responsible for service performance or quality.
      </Typography>

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        For Nigerian operations, the Platform functions strictly as an intermediary technology provider and does not assume employer liability for independent contractors.
      </Typography>

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        3. ELIGIBILITY
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        To use the Platform, Users must:
      </Typography>
      <ListItem bullet="•" text="Be at least 18 years old" />
      <ListItem
        bullet="•"
        text="Provide accurate, complete, and current registration information"
      />
      <ListItem bullet="•" text="Not use the Platform for unlawful purposes" />
      <ListItem
        bullet="•"
        text="Ensure Service Providers meet all applicable licensing, tax, qualification, and regulatory requirements under Nigerian law"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        The Company reserves the right to suspend or terminate accounts in breach of these Terms or any applicable Nigerian regulation.
      </Typography>

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        4. ACCOUNT REGISTRATION & SECURITY
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        Users are responsible for:
      </Typography>
      <ListItem bullet="•" text="Maintaining confidentiality of login credentials" />
      <ListItem bullet="•" text="All activities under their account" />
      <ListItem
        bullet="•"
        text="Prompt notification of unauthorized access"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
        The Company is not liable for losses resulting from failure to safeguard login credentials.
      </Typography>

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        Where identity verification is required for fraud prevention or regulatory compliance, users consent to verification consistent with Nigerian anti-fraud regulations.
      </Typography>

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        5. NATURE OF THE PLATFORM
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        The Company:
      </Typography>
      <ListItem
        bullet="•"
        text="Facilitates introductions between Clients and Independent Service Providers"
      />
      <ListItem
        bullet="•"
        text="Does not supervise, control, or direct the performance of services"
      />
      <ListItem
        bullet="•"
        text="Does not employ Service Providers unless expressly stated"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        All Service Providers operate as independent contractors, not employees, agents, or representatives of the Company under Nigerian labor law.
      </Typography>

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        6. PAYMENTS & FEES
      </Typography>
      <ListItem
        bullet="•"
        text="Service Pricing: Service Providers set their service prices. Clients pay the price displayed at booking."
      />
      <ListItem
        bullet="•"
        text="Platform Commission: The Platform collects a commission on each service transaction, which is split between the Service Provider and the Service Seeker."
      />
      <ListItem
        bullet="•"
        text="The applicable commission rates are displayed to both parties before confirming the booking."
      />
      <ListItem
        bullet="•"
        text="Users agree to pay the commission as displayed at the time of transaction."
      />
      <ListItem
        bullet="•"
        text="Additional Fees: The Company may charge additional platform fees or service charges, which will also be displayed at the time of booking."
      />
      <ListItem
        bullet="•"
        text="Payment Processing: All payments are processed via approved third-party payment providers. The Company is not responsible for banking errors, third-party failures, delays from Nigerian financial institutions, or system disruptions beyond its control."
      />
      <ListItem
        bullet="•"
        text="Taxes: Service Providers are solely responsible for compliance with Nigerian tax law."
      />
      <ListItem
        bullet="•"
        text="The Company is not responsible for calculating or remit ting taxes on behalf of Users"
      />
      <ListItem
        bullet="•"
        text="Refunds & Adjustments: Refunds or adjustments are governed by the Platform’s Refund Policy, if applicable."
      />
      <ListItem
        bullet="•"
        text="Any changes to pricing or fees will be clearly displayed prior to transaction confirmation."
        marginBottom={scale(30)}
      />

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        7. USER CONDUCT
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        Users agree not to:
      </Typography>
      <ListItem bullet="•" text="Provide false or misleading information" />
      <ListItem
        bullet="•"
        text="Engage in harassment, abuse, or discrimination"
      />
      <ListItem bullet="•" text="Circumvent the Platform to avoid fees" />
      <ListItem
        bullet="•"
        text="Use the Platform for fraudulent, illegal, or harmful activities"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        Violations may result in account suspension, termination, and reporting to Nigerian law enforcement authorities.
      </Typography>

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        8. DISCLAIMERS
      </Typography>
      <Typography
        fontWeight="bold"
        size="md"
        lineHeight={verticalScale(24)}
        marginBottom={scale(5)}>
        8.1 Service Disclaimer
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        The Platform is provided “as is” and “as available”. The Company does not guarantee:
      </Typography>
      <ListItem bullet="•" text="Continuous availability" />
      <ListItem bullet="•" text="Error-free functionality" />
      <ListItem bullet="•" text="Suitability or performance of Service Providers" />
      <ListItem
        bullet="•"
        text="Specific results from services rendered"
        marginBottom={scale(15)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
        Clients are responsible for evaluating Service Providers before engagement.
      </Typography>

      <Typography
        fontWeight="bold"
        size="md"
        lineHeight={verticalScale(24)}
        marginBottom={scale(5)}>
        8.2 App Maintenance & Downtime
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        The Company may:
      </Typography>
      <ListItem bullet="•" text="Perform scheduled or emergency maintenance" />
      <ListItem bullet="•" text="Update, suspend, or discontinue features" />
      <ListItem
        bullet="•"
        text="Experience technical interruptions beyond its control"
        marginBottom={scale(15)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
        The Company is not liable for losses arising from: server downtime, system failures, internet disruptions, cybersecurity incidents despite reasonable safeguards, power outages, or telecommunications failures in Nigeria.
      </Typography>

      <Typography
        fontWeight="bold"
        size="md"
        lineHeight={verticalScale(24)}
        marginBottom={scale(5)}>
        8.3 Limitation of Liability
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        To the fullest extent permitted under Nigerian law:
      </Typography>
      <ListItem
        bullet="•"
        text="The Company is not liable for indirect, incidental, or consequential damages, loss of profits, data, goodwill, or disputes between Clients and Service Providers."
      />
      <ListItem
        bullet="•"
        text="Total liability shall not exceed the amount paid by the user in the preceding three months."
      />
      <ListItem
        bullet="•"
        text="Nothing in this clause excludes liability that cannot be excluded under Nigerian law."
        marginBottom={scale(30)}
      />

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        9. DATA PROCESSING & USER CONSENT (NDPR / NDPA COMPLIANT)
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        By using the Platform, Users consent to:
      </Typography>
      <ListItem
        bullet="•"
        text="Collection and processing of personal data (name, contact details, location, service preferences)"
      />
      <ListItem bullet="•" text="Payment-related processing" />
      <ListItem
        bullet="•"
        text="Communication via email, SMS, or in-app notifications"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
        Data may be processed for: identity verification, background screening (where applicable), fraud prevention, and service improvement analytics.
      </Typography>

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        Data processing complies with:
      </Typography>
      <ListItem bullet="•" text="Nigeria Data Protection Regulation (NDPR) 2019" />
      <ListItem
        bullet="•"
        text="Nigeria Data Protection Act (NDPA) 2023"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        Processing is based on:
      </Typography>
      <ListItem bullet="•" text="User consent" />
      <ListItem bullet="•" text="Performance of contract" />
      <ListItem bullet="•" text="Legal obligation" />
      <ListItem
        bullet="•"
        text="Legitimate business interest"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        Users may withdraw consent subject to statutory limitations.
      </Typography>

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        10. PRIVACY & DATA SECURITY
      </Typography>
      <ListItem
        bullet="•"
        text="Data Collected: Personal identification, device/technical data, usage analytics, location (if enabled), payment info via third-party processors"
      />
      <ListItem
        bullet="•"
        text="Use: Facilitate bookings, improve services, prevent fraud, customer support, legal compliance"
      />
      <ListItem
        bullet="•"
        text="Storage & Security: Encryption, secure servers, access controls, periodic reviews. Users acknowledge inherent digital risks."
      />
      <ListItem
        bullet="•"
        text="Retention: Data retained as necessary for operational or legal purposes, or until deletion request is processed."
      />
      <ListItem
        bullet="•"
        text="User Rights: Access, correction, deletion, withdrawal of consent, objection to processing, restriction, complaint to NITDA"
      />
      <ListItem
        bullet="•"
        text="Cross-Border Transfers: Allowed only with adequate safeguards, contracts, or explicit consent"
      />
      <ListItem
        bullet="•"
        text="Breach Notification: Prompt risk assessment, regulatory notification, and affected user notification"
      />
      <ListItem
        bullet="•"
        text="Child Data: Platform not intended for under 18; parental consent required for minor-related services"
        marginBottom={scale(30)}
      />

      <Typography
        fontWeight="bold"
        size="m2d"
        lineHeight={verticalScale(26)}
        marginBottom={scale(10)}>
        11. COOKIE POLICY
      </Typography>
      <ListItem
        bullet="•"
        text="Cookies used to maintain sessions, improve performance, analyze traffic, personalize experience"
      />
      <ListItem
        bullet="•"
        text="Users can manage cookies via browser settings"
        marginBottom={scale(30)}
      />

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        12. INTELLECTUAL PROPERTY
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        All content (logos, designs, software, branding) remains the Company’s exclusive property and is protected under Nigerian law. Users may not copy, distribute, or reproduce without authorization.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        13. TERMINATION
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        The Company may:
      </Typography>
      <ListItem bullet="•" text="Suspend or terminate accounts" />
      <ListItem bullet="•" text="Remove content" />
      <ListItem
        bullet="•"
        text="Deny access for violations of these Terms or unlawful conduct"
        marginBottom={scale(20)}
      />

      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(30)}>
        Termination does not affect accrued rights or obligations.
      </Typography>

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        14. GOVERNING LAW & DISPUTE RESOLUTION
      </Typography>
      <ListItem bullet="•" text="Governed by Federal Republic of Nigeria laws" />
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(15)}>
        • Disputes resolved in order of:
      </Typography>
      <ListItem bullet="1." text="Good faith negotiation" />
      <ListItem bullet="2." text="Mediation within Nigeria" />
      <ListItem
        bullet="3."
        text="Arbitration under the Arbitration and Conciliation Act, Cap A18, LFN 2004"
      />
      <ListItem
        bullet="4."
        text="Competent Nigerian courts (High Court with jurisdiction)"
        marginBottom={scale(30)}
      />

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        15. AMENDMENTS
      </Typography>
      <ListItem
        bullet="•"
        text="Company may update Terms in compliance with Nigerian regulations"
      />
      <ListItem
        bullet="•"
        text="Users will be notified via email or in-app notification"
      />
      <ListItem
        bullet="•"
        text="Continued use after updates constitutes acceptance of revised terms"
        marginBottom={scale(30)}
      />

      <Typography fontWeight="bold" size="m2d" marginBottom={scale(10)}>
        16. CONTACT INFORMATION
      </Typography>
      <Typography
        size="md"
        color="black"
        lineHeight={verticalScale(24)}
        marginBottom={scale(20)}>
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
