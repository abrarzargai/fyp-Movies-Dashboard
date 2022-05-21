import React from "react";

export const FooterPage = () => {
  const year = new Date();
  return (
    <>
      {/* <div className="wrapper row4 bgded overlay" style={{backgroundImage: "url('images/demo/backgrounds/03.png')"}}>
        <footer id="footer" className="hoc clear">
          <div className="one_quarter first">
            <h6 className="title">Libero semper nec</h6>
            <p>Eros et magna ut vitae faucibus dui nec fermentum mauris nunc molestie venenatis metus et porttitor nisi faucibus ut cras non sem facilisis.</p>
            <p>Hendrerit ligula ut blandit sem nulla non ipsum rutrum tempor dolor non faucibus eros cras imperdiet cursus sapien.</p>
          </div>
          <div className="one_quarter">
            <h6 className="title">Nisi ornare aliquet</h6>
            <ul className="nospace linklist contact">
              <li><i className="fa fa-map-marker"></i>
                <address>
                  Street Name &amp; Number, Town, Postcode/Zip
                </address>
              </li>
              <li><i className="fa fa-phone"></i> +00 (123) 456 7890<br />
                +00 (123) 456 7890</li>
              <li><i className="fa fa-fax"></i> +00 (123) 456 7890</li>
              <li><i className="fa fa-envelope-o"></i> info@domain.com</li>
            </ul>
          </div>
          <div className="one_quarter">
            <h6 className="title">Donec at tellus eu</h6>
            <ul className="nospace linklist">
              <li><a href="#">Mauris in condimentum lacus</a></li>
              <li><a href="#">Sed hendrerit est praesent</a></li>
              <li><a href="#">Tempor dapibus enim phasellus</a></li>
              <li><a href="#">Convallis lectus a tristique</a></li>
              <li><a href="#">Lectus nisi sodales sem at</a></li>
            </ul>
          </div>
          <div className="one_quarter">
            <h6 className="title">ac urna morbi rutrum</h6>
            <ul className="nospace linklist">
              <li>
                <article>
                  <h2 className="nospace font-x1"><a href="#">dignissim libero augue</a></h2>
                  <time className="font-xs block btmspace-10" dateTime="2045-04-06">Friday, 6<sup>th</sup> April 2045</time>
                  <p className="nospace">aenean non egestas urna curabitur vitae aliquam felis&hellip;</p>
                </article>
              </li>
              <li>
                <article>
                  <h2 className="nospace font-x1"><a href="#">et nisl id pretium</a></h2>
                  <time className="font-xs block btmspace-10" dateTime="2045-04-05">Thursday, 5<sup>th</sup> April 2045</time>
                  <p className="nospace">eros vehicula eros nec lacinia sem tellus vel turpis vivamus&hellip;</p>
                </article>
              </li>
            </ul>
          </div>
        </footer>
      </div> */}
      <div className="wrapper row5 text-center">
        <div id="copyright" className="hoc clear">
          <p className="">Copyright &copy; {year.getFullYear()} - All Rights Reserved - <a href="/"></a></p>
        </div>
      </div>
    </>
  );
};
