
const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-info">
                <h2>Let's chat. Tell me about your project.</h2>
                <p>Let's create something together ✌️</p>
                <div className="contact-email">
                    <span>📧 Mail me at</span>
                </div>
            </div>
            
            <div className="contact-form">
                <h3>Send us a message 🚀</h3>
                <form>
                    <input type="text" placeholder="Full name*" required />
                    <input type="email" placeholder="Email address*" required />
                    <input type="text" placeholder="Subject" />
                    <textarea placeholder="Tell us more about your project*" required></textarea>
                    <button type="submit">Send message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;