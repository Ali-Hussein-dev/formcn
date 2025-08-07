import type { FormElementOrList, FormStep } from "@/form-builder/form-types";

type TemplateList = Record<
  string,
  { template: FormElementOrList[] | FormStep[]; name: string }
>;

export const templates: TemplateList = {
  signUp: {
    name: "Sign up",
    template: [
      {
        id: "sign-up-heading",
        name: "Sign up",
        fieldType: "H1",
        static: true,
        content: "Sign up",
      },
      {
        id: "sign-up-paragraph",
        name: "Paragraph",
        fieldType: "P",
        static: true,
        content: "Sign up to create an account",
      },
      {
        id: "sign-up-email",
        name: "Email",
        fieldType: "Input",
        type: "email",
        placeholder: "Enter your Email",
      },
      {
        id: "sign-up-password",
        name: "Password",
        fieldType: "Password",
        placeholder: "Password",
        label: "Password",
        type: "password",
        required: true,
      },
      {
        id: "sign-up-agree",
        name: "agree",
        fieldType: "Checkbox",
        label: "I agree to the terms and conditions",
        required: true,
      },
    ],
  },
  feedbackForm: {
    name: "Feedback Form",
    template: [
      {
        id: "feedback-heading",
        name: "Feedback Form",
        fieldType: "H1",
        static: true,
        content: "Feedback Form",
      },
      {
        id: "feedback-paragraph",
        name: "Paragraph",
        fieldType: "P",
        static: true,
        content: "Please provide your feedback",
      },
      {
        id: "feedback-comment",
        name: "Comment",
        fieldType: "Textarea",
        placeholder: "Share your feedback",
        label: "Feedback Comment",
      },
    ],
  },
  waitlist: {
    name: "Waitlist",
    template: [
      {
        id: "waitlist-heading",
        name: "Waitlist",
        fieldType: "H1",
        static: true,
        content: "Waitlist",
      },
      {
        id: "waitlist-paragraph",
        name: "Paragraph",
        fieldType: "P",
        static: true,
        content: "Join our waitlist to get early access",
      },
      {
        id: "waitlist-email",
        name: "Email",
        label: "Your Email",
        fieldType: "Input",
        type: "email",
        placeholder: "Enter your Email",
        required: true,
      },
    ],
  },
  contactUs: {
    name: "Contact Us",
    template: [
      {
        id: "contact-heading",
        name: "heading",
        fieldType: "H2",
        static: true,
        content: "Contact us",
      },
      {
        id: "contact-paragraph",
        name: "paragraph",
        fieldType: "P",
        static: true,
        content: "Please fill the form below to contact us",
      },
      [
        {
          id: "contact-name",
          name: "name",
          fieldType: "Input",
          type: "text",
          label: "Name",
          required: true,
          placeholder: "Enter your name",
        },
        {
          id: "contact-email",
          name: "email",
          fieldType: "Input",
          type: "email",
          label: "Email",
          required: true,
          placeholder: "Enter your email",
        },
      ],
      {
        id: "contact-message",
        name: "Message",
        fieldType: "Textarea",
        label: "Message",
        placeholder: "Enter your message",
        required: true,
      },
      {
        id: "contact-agree",
        name: "agree",
        fieldType: "Checkbox",
        label: "I agree to the terms and conditions",
        required: true,
      },
    ],
  },
  multiStepForm: {
    name: "Survey Form",
    template: [
      {
        id: "survey-step-1",
        stepFields: [
          {
            id: "survey-personal-heading",
            name: "heading-2",
            fieldType: "H2",
            static: true,
            content: "Personal Details",
          },
          {
            id: "survey-personal-paragraph",
            name: "paragraph",
            fieldType: "P",
            static: true,
            content: "Please provide your personal details",
          },
          {
            id: "survey-first-name",
            name: "Name",
            fieldType: "Input",
            placeholder: "First name",
            label: "First name",
            required: true,
          },
          {
            id: "survey-last-name",
            name: "last-name",
            fieldType: "Input",
            placeholder: "Last name",
            label: "Last name",
          },
        ],
      },
      {
        id: "survey-step-2",
        stepFields: [
          {
            name: "heading-2",
            id: "survey-contact-heading",
            fieldType: "H2",
            static: true,
            content: "Contact Information",
          },
          {
            name: "paragraph",
            id: "survey-contact-paragraph",
            fieldType: "P",
            static: true,
            content: "Please provide your contact information",
          },
          {
            name: "your-email",
            id: "survey-contact-email",
            fieldType: "Input",
            label: "Your Email",
            type: "email",
            required: true,
            placeholder: "Enter your email",
          },
          {
            name: "phone-number",
            id: "survey-contact-phone",
            fieldType: "Input",
            label: "Phone Number",
            type: "number",
            placeholder: "Enter your phone number",
          },
        ],
      },
      {
        id: "survey-step-3",
        stepFields: [
          {
            name: "step-2",
            id: "survey-preferences-heading",
            fieldType: "H2",
            static: true,
            content: "Your Preferences",
          },
          {
            id: "survey-preferences-toggle",
            name: "preferences",
            fieldType: "ToggleGroup",
            type: "multiple",
            label: "Tell us about your interests and preferences.",
            options: [
              { label: "Technology", value: "technology" },
              { label: "Business", value: "Business" },
              { label: "Health", value: "Health" },
              { label: "Science", value: "Science" },
            ],
          },
          {
            id: "survey-preferences-comment",
            name: "Comment",
            fieldType: "Textarea",
            placeholder: "Share your feedback",
            label: "Feedback Comment",
          },
        ],
      },
    ],
  },
};
