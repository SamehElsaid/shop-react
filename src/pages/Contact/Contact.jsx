import React, { memo, useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
const Contact = memo(() => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();

      emailjs
        .sendForm(
          "service_r56u0uv",
          "template_u3v1vml",
          form.current,
          "kFvkFMb5JZZQAuKXj"
        )
        .then(
          (result) => {
            toast.success("Send Massage done", {
              theme: "colored",
            });
            form.current.name.value = ""
            form.current.email.value = "";
            form.current.massage.value = "";
            form.current.feedBack.value = "";
          },
          (error) => {
             toast.error(error.text, {
               theme: "colored",
             });
          }
        );
    };
    return (
      <section>
        <div className="container">
          <form action="" onSubmit={sendEmail} ref={form}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  name="name"
                  required
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  name="email"
                  required
                />
              </div>
            </div>
            <textarea
              className="form-control"
              id=""
              cols="30"
              rows="10"
              placeholder="Your Massage"
              required
              name="massage"
            ></textarea>
            <input
              type="text"
              className="form-control"
              name="feedBack"
              placeholder="Your FeedBack"
            />
            <button type="submit" className="btn btn-info">
              Send Your Massage
            </button>
          </form>
        </div>
      </section>
    );
});

export default Contact;