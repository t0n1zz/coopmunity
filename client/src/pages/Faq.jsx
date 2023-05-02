import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomButton } from "components";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Faq = () => {
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-blue-500 h-96 rounded-lg mb-5">
        <h1 className="font-lato font-bold w-full text-white text-xl text-center">
          What is COOPMUNITY ?
        </h1>
        <hr className="w-16 h-1 bg-white my-4" />
        <p className="text-lg text-white text-center">
          Forum for Credit Union Members
        </p>
        <hr className="w-48 h-1 bg-white my-4" />
        <p className="text-md text-white text-center">
          It is a global network for sharing knowledge, information, and
          experience as a community of Credit Union{" "}
        </p>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          {/* what is credit union */}
          <div>
            <h4 className="font-lato font-semibold text-2xl text-white uppercase">
              What is Credit Union?
            </h4>

            <div className="mt-[20px]">
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                A credit union is a customer/member owned financial cooperative,
                democratically controlled by its members, and operated for the
                purpose of maximizing the economic benefit of its members by
                providing financial services at competitive and fair rates.
              </p>
            </div>
          </div>
          {/* how do we differ */}
          <div>
            <h4 className="font-lato font-semibold text-2xl text-white uppercase">
              How do we differ from banks and other financial instituttions?
            </h4>

            <div className="mt-[20px]">
              <h4 className="font-lato font-normal text-xl text-white uppercase">
                Clientele
              </h4>
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                A credit union is a customer/member owned financial cooperative,
                democratically controlled by its members, and operated for the
                purpose of maximizing the economic benefit of its members by
                providing financial services at competitive and fair rates.
              </p>
            </div>

            <div className="mt-[20px]">
              <h4 className="font-lato font-normal text-xl text-white uppercase">
                Governance
              </h4>
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                Credit union members elect a board of directors from their
                membership. Members each have one vote in board elections,
                regardless of their amount of savings or shares in the credit
                union.
              </p>
            </div>

            <div className="mt-[20px]">
              <h4 className="font-lato font-normal text-xl text-white uppercase">
                Earning
              </h4>
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                Net income is applied first to adequacy requirements. Member
                owned capital structure, compared to stockholder capital, allows
                the credit union to manage surplus to lower interest rates on
                loans, higher interest on savings or new product and service
                development.
              </p>
            </div>

            <div className="mt-[20px]">
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                <i>
                  Source:{" "}
                  <a
                    href="https://www.woccu.org/about/credit_unions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    woccu.org website
                  </a>
                </i>
              </p>
            </div>
          </div>

          {/* separator */}
          <div className="border-b border-gray-300"></div>

          {/* why coopmunity */}
          <div>
            <h4 className="font-lato font-semibold text-2xl text-white uppercase">
              So Why Coopmunity?
            </h4>

            <div className="mt-[20px]">
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                Born on the concern that raised by{" "}
                <b className="text-white">
                  ACUNEL (Asian Credit Union Network of Emerging Leaders)
                </b>{" "}
                members about the lacking of way to mobilize knowledge and
                communication between credit union members across country that
                resulting in low young leaders among credit union members.
                <br />
                <br />
                So to tackle the issue, member of ACUNEL create the online
                platform called <b className="text-white">COOPMUNITY</b> that
                help credit union members especially the youth to come together
                in one single place to share, connect and collaborate together
                to become a future leader and at the same time help to promote
                and advocate credit union movement on each country.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-lato font-semibold text-2xl text-white uppercase">
              are you credit union member?
            </h4>

            <div className="mt-[20px]">
              <p className="font-lato font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                If you are credit union member or want to be credit union member
                then please join us in this global movement and lets change the
                world together
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            {!isAuth && (
              <>
                <CustomButton
                  btnType="button"
                  title="Login"
                  styles="bg-[#3e3e63]"
                  icon={faRightToBracket}
                  handleClick={() => {
                    navigate("/login");
                  }}
                />
                <CustomButton
                  btnType="button"
                  title="Register"
                  styles="bg-[#1dc071]"
                  icon={faUserPlus}
                  handleClick={() => {
                    navigate("/register");
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
