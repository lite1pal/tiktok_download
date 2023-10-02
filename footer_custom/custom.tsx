import { Section, Option } from "@/components/footer/footer";

/* Here you can add or edit footer sections 

Example:
    If you want to add a section with header "Contacts" and options "Linkedin", "Email" and "Phone",
    add below the following:
        <Section header="Contacts">
            <Option link="" text="Linkedin" />
            <Option link="" text="Email" />
            <Option link="" text="Phone" />
        </Section>
*/

export default function CustomFooter() {
  return (
    <div className="flex flex-wrap lg:justify-between lg:pl-20 lg:w-9/12 text-black text-opacity-70 justify-between w-10/12">
      <Section header="Company">
        <Option link="" text="Contact" />
      </Section>

      <Section header="Legal">
        <Option link="" text="Terms of Service" />
        <Option link="" text="Privacy Policy" />
      </Section>

      <Section header="Tools">
        <Option link="" text="Download video Douyin" />
        <Option link="" text="Download Tiktok Slide" />
        <Option link="" text="Download Tiktok Story" />
      </Section>
    </div>
  );
}
