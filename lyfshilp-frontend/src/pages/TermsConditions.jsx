import { useState } from "react";

export default function TermsConditions() {
  const sections = [
    {
      id: "terms",
      title: "1. Terms of Use",
      paragraphs: [
        "These Terms of Use set out the terms and conditions for use of this Creative Edge Learning, Indirapuram (unit of LyfShilp Academy Pvt. Ltd) (“Website”) and any content, Public Forums, or services offered on or through the Website and/or through any mobile application(s) (“Application”) (collectively referred to as the “Platform”).",
        "These Terms of Use apply to end users of the Website (referred to as “Learners”, “You”, “Your”). These Terms of Use, including the Privacy Policy and any other terms and conditions published on the Platform or communicated to you from time to time (collectively referred to as the “Agreement”), define the relationship and responsibilities between You and Creator (as defined herein) in using the Platform. Your access to the Platform is subject to Your acceptance of this Agreement.",
        "When we speak of “Creator”, ‘we’, ‘us’, and ‘our’, we collectively mean Creative Edge Learning, Indirapuram (unit of LyfShilp Academy Pvt. Ltd) being the creator of this Platform and the content/materials/services contained therein.",
        "By accessing this Platform, You are agreeing to be bound by the terms of this Agreement, all applicable laws and regulations. From time-to-time, versions of the above-mentioned policies and terms are made available on the Platform for Your reference and to understand how we handle Your personal information. By using or visiting the Platform and services provided to You on, from, or through the Platform, You are expressly agreeing to the terms of the Agreement and any other terms that are updated from time to time.",
        "If You disagree with any part of this Agreement or do not wish to be bound by the same, then please do not use the Platform in any manner.",
      ],
    },
    {
      id: "access",
      title: "2. Access & Registration",
      paragraphs: [
        "If You’re an individual, You must be at least 18 (eighteen) years of age, or, if You are between the ages of 13 and 18, You must have Your parent or legal guardian's permission to use the Platform.",
        "By using the Platform, You are, through Your actions, representing and warranting to us that You have obtained the appropriate consents/permissions to use the Platform. If You are under the age of 13 years or 16 years (depending on your country of residence), You may neither use our Platform in any manner nor may You register for any content or services offered therein.",
        "To access any Content offered on the Platform, we require You to register for the same by providing Your name and email address. Please read our Privacy Policy to understand how we handle Your information. Further, You may also be required to make payment of a fee to access the Content, if applicable.",
        "For the purpose of this Agreement, “Content” shall mean and include any course or session (whether pre-recorded or live) published by the Creator on the Platform, including, but not limited to, any reference materials and text files (if any) offered to You as part of the Content.",
        "When You register or enrol for any Content on the Platform, You may also have access to discussion forums that enable You to exchange Your thoughts and knowledge with us and other registrants (“Public Forum”). Participating in the Public Forum is completely Your choice.",
        "We reserve the right to refuse access to the Platform or remove content posted by You in the Public Forums at any time without notice if, in our opinion, You have violated any provision of this Agreement.",
        "Further, to access the Platform and/or view the content, You will need to use a “Supported/Compatible Device” which meets the system requirements. Devices that are Supported/Compatible at one time may cease to be so in the future depending on updates from manufacturers or third parties. Please ensure that Your device is compatible.",
      ],
    },
    {
      id: "license",
      title: "3. License of Use",
      paragraphs: [
        "You are granted a limited, non-exclusive license to access and view the Content on the Platform for Your own personal, non-commercial use only.",
        "Further, if so allowed on the Platform, You may temporarily download one copy of any downloadable Content [including Creator Content (defined below)] on the Platform for personal and non-commercial transitory viewing only.",
        "This license does not grant You the right to assign or sublicense the license granted under this Agreement to anyone else. Further, You may not:",
        "Modify, edit or copy the Content, Creator Content or any material made available on the Platform.",
        "Create derivative works or exploit any material made available on the Platform (including the Content and Creator Content) or any portion thereof (including, but not limited to any copyrighted material, trademarks, or other proprietary information contained therein) in a manner that is not permitted under this license granted to You.",
        "Publicly display (commercially or non-commercially) the Content, Creator Content or any material made available on the Platform or otherwise use the same for any commercial purpose.",
        "Attempt to decompile or reverse engineer any software contained in the Platform.",
        "Remove any copyright or other proprietary notations from the Content, Creator Content or any material made available on the Platform.",
        "Transfer any material made available on the Platform to another person or 'mirror' the same on any other server.",
        "For the purpose of this Agreement, “Creator Content” shall mean and include any audio files, video files, audio-visual files, images, text materials (including .doc, .docx, and .pdfs) (other than the Content) uploaded or otherwise published on the Platform by the Creator to be accessed by You, including, but not limited to, any such content/material posted by the Creator in any Public Forum (defined below).",
        "This license shall automatically terminate if You violate any of these restrictions and may be terminated by us at any time. Upon termination of this license granted to You or Your viewing of any material on the Platform (including Content and Creator Content), You must destroy any downloaded materials in Your possession (whether in electronic or printed format).",
      ],
    },
    {
      id: "communication",
      title: "4. Communication & Public Forums",
      paragraphs: [
        "The Platform includes provision and facilitation of Public Forums designed to enable You to communicate with us and other registrants to the Content You have registered for.",
        "As stated above, use of these Public Forums are completely your choice and by registering for a Content, you are not obligated to participate in the Public Forum. However, if You choose to participate, You agree to adhere to the terms specified in the ‘Code of Conduct’ section hereinbelow and such other terms as may be published on our Platform.",
        "If it comes to our notice that Your conduct is in violation of the terms of this Agreement, then we may terminate or suspend Your access to any Public Forums at any time, without notice, for any reason.",
        "You represent and warrant that You own and control all rights in and to any content (including without limitation chats, postings, or materials) uploaded or posted by You on the Public Forums or anywhere on the Platform (“Learner Content”), or that You are licensed to use and reproduce such Learner Content.",
        "We are not responsible for the information that You choose to share on the Public Forums, or for the actions of other users therein. You further understand and agree that You shall be solely responsible for the Learner Content including its legality, reliability, accuracy, and appropriateness, and the consequences of its publication.",
        "Further, if you do post content or submit any Learner Content on the Platform, and unless otherwise indicated by You in writing (emails included) to us, You hereby grant us a non-exclusive, royalty-free, irrevocable, perpetual and fully sublicensable rights to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such Learner Content throughout the world in any media.",
      ],
    },
    {
  id: "code-of-conduct",
  title: "5. Code of Conduct",
  intro: "You agree to the following:",
  paragraphs: [
    {
      subId: 1,
      subTitle: "Legitimate usage of the Platform",
      text: "You agree to use the Platform only for lawful purposes and You are not allowed to use our Platform to engage in any kind of activity that violates any applicable central, state, local, federal or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the USA or other countries). Also, You agree that You will not use the Platform in any manner that would disrupt, damage or impair the Platform or access to it, in any manner, including promoting or encouraging illegal activity such as hacking, cracking or distribution of counterfeit software, compromised accounts, or cheats or hacks for the Platform and conduct of any form of fraudulent activity."
    },
    {
      subId: 2,
      subTitle: "No harmful or dangerous content",
      text: "Any content which incites or promotes violence, that may cause physical or emotional harm or that may endanger the safety of any individual or is otherwise objectionable is expressly prohibited on the Platform. The Platform is to be used only for the permitted uses as detailed under this Agreement."    },
    {
      subId: 3,
      subTitle: "No hateful or defamatory content",
      text: "We realise that there may be instances when there are exchange of ideas and opinions which is essential in the learning process, while we agree that individuals have the right to voice their opinion, we do not encourage or tolerate any form of hate speech or statements that are libelous, slanderous, threatening, violent, predatory, defamatory, or any statement that incites hatred against specific individuals or groups with respect to but not limited to race or ethnic origin, country caste, religion, disability, gender, age, sexual orientation/gender identity etc."
    },
    {
      subId: 4,
      subTitle: "Violent and graphic content",
      text: "Any content, the sole objective of which is to sensationalise, shock or disturb individuals is not allowed. We do not allow any content that promotes terrorist acts or incites violence, to be uploaded on the Platform in any manner."
    },
    {
      subId: 5,
      subTitle: "Harassment and bullying",
      text: "We do not tolerate any form of harassment or bullying on the Platform and strive to keep the Platform a safe space to foster learning. Harassment in this case would include, without limitation, to abusive videos, comments, messages, revealing someone’s personal information, including sensitive personally identifiable information of individuals, content or comments uploaded in order to humiliate someone, sexual harassment or sexual bullying in any form."
    },
    {
      subId: 6,
      subTitle: "Spam",
      text: "Posting untargeted, unwanted and repetitive content, comments or messages with an intention to spam a Public Forum or otherwise the Platform and to drive traffic from the Platform to other third-party sites is in direct violation of this Agreement. Posting links to external websites with malware and other prohibited sites is not allowed."
    },
    {
      subId: 7,
      subTitle: "Scams",
      text: " Any content uploaded or posted in order to trick others for their own financial gain is not allowed and we do not tolerate any practices of extortion or blackmail, either."
    },
    {
      subId: 8,
      subTitle: "Privacy violation",
      text: "Kindly refer to our Privacy Policy to know how to protect Your privacy and respect the privacy of other Users."
    },
    {
      subId: 9,
      subTitle: "Impersonation",
      text: "Impersonating another person, including but not limited to, another learner, is not permitted while using our Platform. In this case impersonation would mean the intention to cause confusion regarding who the real person is by pretending to be them (such as using names, image, documents, certificates etc. not belonging to You or not used to identify You, or pretending to be a company, institute, group etc., by using their logo, brand name or any distinguishing mark)."
    },
    {
      subId: 10,
      subTitle: "Unauthorized Access or Disabling of Platform",
      text: " You agree not to (i) use the Platform in any manner that could disable, overburden, damage, or impair the Platform or interfere with any other user’s use of the Platform; (ii) not to use any manual process to monitor or copy any of the material on the Platform or for any unauthorized purpose; (iii) use any device, software, or routine that interferes with the proper working of the Platform; (iv) attack the Platform via a denial-of-service attack; (v) attempt to gain unauthorized access to, interfere with, or disrupt any parts of the Platform, the server on which the Platform is stored, or any server, computer, or database connected to or associated with the Platform; and (vi) introduce any viruses, trojan horses, worms, keystroke loggers, malware, or other material which is malicious or technologically harmful to the Platform."
    }
  ],
  closing:
    "If any violation of the above rules of conduct comes to our notice, then, we reserve the right to refuse Your access to the Platform, terminate accounts or remove such violating content at any time without notice to You."
}
,
    {
      id: "intellectual-property",
      title: "6. Intellectual Property",
      paragraphs: ["We own all information and materials, including Content and Creator Content (in whatever form or media) provided or communicated to You by or on behalf of us including but not limited to, the Platform, trademarks, trade dress, logos, wordmarks, illustrations, letters, images, ideas, concepts, the layout, design, flow, look and feel of the Platform, logos, marks, graphics, audio files, video files, any software which is owned by or licensed to us, instructions embedded in any form of digital documents and other data, information, or material made available to You by us (“Creator’s Intellectual Property”).",
    "Creator’s Intellectual Property, including the copyrights and trademarks contained therein, may not be modified by You in any way. You acknowledge and agree that You do not acquire any ownership rights to Creator’s Intellectual Property by use of the Platform or any part thereof.",
    "You acknowledge and agree that the Creator’s Intellectual Property is protected by the applicable intellectual property laws, including international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws and any unauthorized use, reproduction, modification, distribution, transmission, republication, display or performance of the Creator’s Intellectual Property or any component thereof is strictly prohibited."],
    },
    {
      id: "feedbacks",
      title: "7. Feedbacks",
      paragraphs: ["If You submit suggestions, ideas, comments, or questions containing product feedback about any Content, the Platform or any part thereof, either through the Public Forum or otherwise (“Feedback”), then You grants to us a worldwide, non-exclusive, royalty-free, perpetual, and irrevocable right to use (and full right to sublicense), reproduce, modify, adapt, publish, translate, create derivative works from, distribute, transmit, and display such Feedback in any form.",
    "You shall have no intellectual property right in any Content, Platform or any part thereof, as a result of our incorporation of Feedback into any Content or the Platform."],
    },
    {
      id: "payments",
      title: "8. Payments & Refunds",
      paragraphs: ["To register/enrol for any Content, You may need to pay a fee as may be applicable (“Content Fee”). Please refer to our Platform to know the pricing. Payment of such Content Fee shall be processed through third-party payment processors. Your payments may be subject to applicable taxes, so we suggest that You read terms and policies of such third party payment processors to understand the same better. Once You purchase access to a Content on the Platform, the same cannot be cancelled and there shall be no refund of the Content Fee, unless otherwise stated in our Refund Policy.",
    "As stated above, we use third-party service providers to enable You to make payment for the purchases made on the Platform. Accordingly, it is hereby clarified that we do not capture and/or store any of your sensitive personal information. While making payments through such third-party payment gateways/service providers kindly ensure to read through their terms and conditions."],
    },
    {
      id: "disclaimer",
      title: "9. Disclaimer",
      paragraphs: ["The Platform is provided to you 'AS IS' and 'AS AVAILABLE' and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Creator, on its own behalf and on behalf of its affiliates, licensors, and service providers, expressly disclaims all warranties, whether express, implied, statutory, or otherwise, with respect to the Platform. This includes, but is not limited to, implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, as well as warranties that may arise out of course of dealing, performance, usage, or trade practice.",
    "Without limitation to the foregoing, the Creator provides no warranty or undertaking, and makes no representation of any kind that the Platform or the services or products offered will meet your requirements, achieve intended results, be compatible with other systems, operate without interruption, meet performance or reliability standards, or be error-free. The Creator also does not guarantee that any errors or defects can or will be corrected.",
    "Furthermore, the Creator makes no representation or warranty: (i) regarding the operation or availability of the Platform, or the information, content, and materials or products included thereon; (ii) that the Platform will be uninterrupted or error-free; (iii) regarding the accuracy, reliability, or currency of information or content provided through the Platform; or (iv) that the Platform, its servers, content, or emails sent from the Creator are free from viruses, malware, trojans, worms, or other harmful components.",
    "Some jurisdictions do not allow the exclusion of certain warranties or limitations on the rights of consumers, so some or all of the above exclusions may not apply to you. In such cases, the exclusions and limitations set forth in this section shall be applied to the maximum extent permitted under applicable law."],
    },
    {
      id: "limitation-liability",
      title: "10. Limitation of Liability",
      paragraphs: [    "In no event shall the Creator be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Content or any other materials on the Platform, even if the Creator or any authorized personnel of the Creator has been notified orally or in writing of the possibility of such damage.",
    "Some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, so some or all of these limitations may not apply to you."],
    },
    {
      id: "indemnity",
      title: "11. Indemnity and Release",
      paragraphs: [ "You shall indemnify and hold harmless the Creator and where applicable, its officers, directors, agents and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Agreement or any document incorporated by reference, or Your violation of any law, rules, regulations or the rights of a third party."],
    },
    {
      id: "third-party",
      title: "12. Links to Third Party Website",
      paragraphs: [   "Creator has not reviewed all of the sites linked to its Platform and is not responsible for the contents of any such linked site.",
    "The inclusion of any link does not imply endorsement by the Creator of such site.",
    "Use of any such linked website is at your own risk."],
    },
    {
      id: "governing-law",
      title: "13. Governing Law and Jurisdiction",
      paragraphs: [  "Any claim relating to the Platform shall be governed by the laws of the Creator’s home jurisdiction (as provided on the Platform) without regard to its conflict of law provisions.",
    "You agree, as we do, to submit to the exclusive jurisdiction of the courts at Creator’s home jurisdiction."
  ],
    },
    {
      id: "miscellaneous",
      title: "14. Miscellaneous",
      paragraphs: [  "Alteration of Platform or Amendments to the Conditions: We reserve the right to make changes to our Platform, policies, and this Agreement at any time. We will post the new terms with a revision date indicated at the top or if deemed practicable. You should check our Platform frequently to see recent changes. You will be subject to the Agreement and the policies in force at the time that You use the Platform or any part thereof, unless any change to those policies or these conditions is required to be made by law or government authority (in which case it will apply to orders previously placed by You). If any of these conditions is deemed invalid, void, or for any reason unenforceable, that condition will be deemed severable and will not affect the validity and enforceability of any remaining condition.",
    "Waiver: If You breach these conditions and we take no action, we will still be entitled to use our rights and remedies in any other situation where You breach these conditions.",
    "Assignment: You may not assign or transfer this Agreement, by operation or law or otherwise. Any attempt by You to assign or transfer this Agreement will be null and void.",
    "Severability: If any provision of this Agreement will be adjudged by any court of competent jurisdiction to be unenforceable or invalid, that provision will be limited to the minimum extent necessary so that this Agreement will otherwise remain in effect.",
    "Events beyond our reasonable control: We will not be held responsible for any delay or failure to comply with our obligations under these conditions if the delay or failure arises from any cause which is beyond our reasonable control. This condition does not affect Your statutory rights.",
    "Contact Us: If You’ve have concerns or queries regarding this Agreement, You may write to us by email at contact.us@lyfshilpacademy.in."],
    },
  ];

  return (
    <section className="bg-white min-h-screen py-10 pt-20">
      {/* Header */}
      <div className="bg-green-800 text-white py-8 text-center relative">
        <span className="absolute top-2 right-4 bg-yellow-300 text-black px-3 py-1 rounded-md text-sm">
          Last updated on 1 Oct, 2025
        </span>
        <h1 className="text-4xl font-bold">
          Terms <span className="text-yellow-300">& Conditions</span>
        </h1>
      </div>

      {/* Content + TOC */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-10">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="text-xl font-semibold mb-3">{section.title}</h2>

              {/* Normal paragraph sections */}
              {Array.isArray(section.paragraphs) &&
              typeof section.paragraphs[0] === "string" ? (
                section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-600 leading-relaxed text-justify"
                  >
                    {para}
                  </p>
                ))
              ) : (
                <>
                  {section.intro && (
                    <p className="text-gray-600 mb-3">{section.intro}</p>
                  )}
                  <ul className="list-disc list-inside space-y-2">
                    {section.paragraphs.map((rule) => (
                      <li key={rule.subId}>
                        <strong>{rule.subTitle}: </strong>
                        <span className="text-gray-600">{rule.text}</span>
                      </li>
                    ))}
                  </ul>
                  {section.closing && (
                    <p className="text-gray-600 mt-3">{section.closing}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Right TOC */}
        <div className="bg-yellow-100 rounded-lg p-6 shadow-md h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
          <ul className="space-y-2 text-gray-700">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="hover:text-green-600 transition"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
