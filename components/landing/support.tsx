import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

type SupportProps = React.HTMLAttributes<HTMLDivElement>;

const summaryItems = [
  {
    details: "General Inquiries:",
    summary: "Contact us for any general questions about Synergy Flow.",
  },

  {
    details: "Technical Support:",
    summary: "Reach out for technical assistance or troubleshooting.",
  },
  {
    details: "Sales and Partnerships:",
    summary: "Explore collaboration opportunities or discuss sales inquiries.",
  },
  {
    details: "Feedback and Suggestions:",
    summary:
      "Share your feedback or suggestions to help us improve Synergy Flow.",
  },
  {
    details: "Media and Press Inquiries:",
    summary:
      "Contact our media relations team for press inquiries or media coverage.",
  },
];

const Support = () => {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-10 lg:py-12">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
          Contact for Enquiries
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          SynergyFlow's contact section facilitates seamless communication,
          offering avenues for inquiries, feedback, and collaboration, ensuring
          smooth interactions for enhanced engagement and support.
        </p>
      </div>
      <div className="container md:py-12 lg:py-24">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-gradient-to-r from-blue-700 to-yellow-400  py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="flex mb-3 text-2xl font-bold text-Black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help ?
              </h2>
              <p className="mb-12 text-base font-medium text-white">
                Our support team will get back to you ASAP via email.
              </p>

              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <a
                    href="javascript:void(
        window.open(
          'https://form.jotform.com/240719124202445',
          'blank',
          'scrollbars=yes,
          toolbar=no,
          width=700,
          height=500'
        )
      )
    "
                  >
                    <button className="rounded-md bg-white py-4 px-9 text-base font-medium text-[rgb(36,43,81)] transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      Click Here
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <img
              src="/images/Form.png"
              alt="form"
              className="hidden lg:block py-auto"
            />
          </div>
          <section className="my-5 w-3/4  p-4 border-1 border-gray-400 shadow-md">
            <p className="text-2xl text-black font-semibold my-2">
              Similar Questions
            </p>
            {summaryItems.map((item) => (
              <details className="border-2 border-gray-300 p-4 bg-slate-100 m-2">
                <summary className="text-lg text-semibold text-blue-700">
                  {item.details}
                </summary>
                {item.summary}
              </details>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Support;

export { Support };
