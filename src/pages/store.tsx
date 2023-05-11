import { CSSProperties, useEffect, useRef, useState } from "react";

import css from "../styles/Store.module.css";
import { useSideNav } from "../Components/Nav/NavContext";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Nav from "../Components/Nav/Nav";

export default function Store() {
  const collectionDivTagRef = useRef<HTMLDivElement>(null)
  const scriptTag = `
    /*<![CDATA[*/
    (function () {
      var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        } else {
          loadScript();
        }
      } else {
        loadScript();
      }
      function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
      }
      function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
          domain: 'stp-creative.myshopify.com',
          storefrontAccessToken: '9b4e0e8e5ddf142a2793b9b2105cc5b2',
        });
        ShopifyBuy.UI.onReady(client).then(function (ui) {
          const node = document.getElementById('collection-component-1682823359416')
          if(!node)
          return console.log("COLLECTION COMPONENT DIV NOT FOUND")

          node.innerHTML=''
  
          ui.createComponent('collection', {
            id: '90075594810',
            iframe: false, 
            node: document.getElementById('collection-component-1682823359416'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
      "product": {
        "styles": {
          "product": {

            "@media (min-width: 601px)": {
              "text-align": "center",
              "max-width": "400px",
              "margin-left": "20px",
              "margin-bottom": "50px",
              "width": "calc(25% - 20px)"
            },
            "img": {
              "height": "calc(100% - 15px)",
              "position": "absolute",
              "left": "0",
              "right": "0",
              "top": "0"
            },
            "imgWrapper": {
              "padding-top": "calc(75% + 15px)",
              "position": "relative",
              "height": "0"
            }
          },
          "title": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-weight": "normal",
            "font-size": "14px",
            "color": "#000000"
          },
          "button": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-size": "13px",
            "padding-top": "6.5px",
            "padding-bottom": "6.5px",
            "border": "1px solid black",
            "color": "#000000",
            ":hover": {
              "color": "#000000",
              "background-color": "rgb(239, 239, 239)"
            },
            "background-color": "rgb(239, 239, 239)",
            ":focus": {
              "background-color": "rgb(239, 239, 239)"
            },
            "border-radius": "4px",
            "padding-left": "10px",
            "padding-right": "10px"
          },
          "quantityInput": {
            "font-size": "13px",
            "padding-top": "14.5px",
            "padding-bottom": "14.5px"
          },
          "price": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "color": "#000000"
          },
          "compareAt": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "color": "#000000"
          },
          "unitPrice": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "color": "#000000"
          }
        },
        "text": {
          "button": "Add to cart"
        }
      },
      "productSet": {
        "styles": {
          "products": {
            "text-align": "left",
            "@media (min-width: 601px)": {
              "margin-left": "-20px",
            },
            "@media (max-width: 575px)": {
              "text-align": "center !important",
            }
          }
        }
      },
      "modalProduct": {
        "contents": {
          "img": false,
          "imgWithCarousel": true
        },
        "styles": {
          "product": {
            "@media (min-width: 601px)": {
              "max-width": "100%",
              "margin-left": "0px",
              "margin-bottom": "0px"
            }
          },
          "button": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-size": "13px",
            "padding-top": "14.5px",
            "padding-bottom": "14.5px",
            
            "color": "#000000",
            ":hover": {
              "color": "#000000",
              "background-color": "rgb(239, 239, 239)"
            },
            "background-color": "rgb(239, 239, 239)",
            ":focus": {
              "background-color": "rgb(239, 239, 239)"
            },
            "border-radius": "4px",
            "padding-left": "100px",
            "padding-right": "100px"
          },
          "quantityInput": {
            "font-size": "13px",
            "padding-top": "14.5px",
            "padding-bottom": "14.5px"
          },
          "title": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-weight": "normal",
            "font-size": "26px",
            "color": "#4c4c4c"
          },
          "price": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-weight": "normal",
            "font-size": "14px",
            "color": "#4c4c4c"
          },
          "compareAt": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-weight": "normal",
            "font-size": "11.9px",
            "color": "#4c4c4c"
          },
          "unitPrice": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-weight": "normal",
            "font-size": "11.9px",
            "color": "#4c4c4c"
          },
          "description": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
          }
        },
        "text": {
          "button": "Add to cart"
        }
      },
      "option": {
        "styles": {
          "label": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
          },
          "select": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
          }
        }
      },
      "cart": {
        "styles": {
          "button": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "font-size": "13px",
            "padding-top": "14.5px",
            "padding-bottom": "14.5px",
            
            "color": "#000",
            ":hover": {
              "color": "#000000",
              "background-color": "rgb(239, 239, 239)"
            },
            "background-color": "rgb(239, 239, 239)",
            ":focus": {
              "background-color": "rgb(239, 239, 239)"
            },
            "border-radius": "4px"
          },
          "title": {
            "color": "#000000"
          },
          "header": {
            "color": "#000000"
          },
          "lineItems": {
            "color": "#000000"
          },
          "subtotalText": {
            "color": "#000000"
          },
          "subtotal": {
            "color": "#000000"
          },
          "notice": {
            "color": "#000000"
          },
          "currency": {
            "color": "#000000"
          },
          "close": {
            "color": "#000000",
            ":hover": {
              "color": "#000000"
            }
          },
          "empty": {
            "color": "#000000"
          },
          "noteDescription": {
            "color": "#000000"
          },
          "discountText": {
            "color": "#000000"
          },
          "discountIcon": {
            "fill": "#000000"
          },
          "discountAmount": {
            "color": "#000000"
          }
        },
        "text": {
          "total": "Subtotal",
          "button": "Checkout"
        },
        "contents": {
          "note": true
        },
        "popup": false
      },
      "toggle": {
        "styles": {
          "toggle": {
            "font-family": "Helvetica",
            "letter-spacing": "-0.03em",
            "background-color": "rgb(239, 239, 239)",
            ":hover": {
              "background-color": "rgb(239, 239, 239)"
            },
            ":focus": {
              "background-color": "rgb(239, 239, 239)"
            }
          },
          "count": {
            "font-size": "13px",
            "color": "#000000",
            ":hover": {
              "color": "#000000"
            }
          },
          "iconPath": {
            "fill": "#000000"
          }
        }
      },
      "lineItem": {
        "styles": {
          "variantTitle": {
            "color": "#000000"
          },
          "title": {
            "color": "#000000"
          },
          "price": {
            "color": "#000000"
          },
          "fullPrice": {
            "color": "#000000"
          },
          "discount": {
            "color": "#000000"
          },
          "discountIcon": {
            "fill": "#000000"
          },
          "quantity": {
            "color": "#000000"
          },
          "quantityIncrement": {
            "color": "#000000",
            "border-color": "#000000"
          },
          "quantityDecrement": {
            "color": "#000000",
            "border-color": "#000000"
          },
          "quantityInput": {
            "color": "#000000",
            "border-color": "#000000"
          }
        }
      }
    },
          });
        });
      }
    })();
/*]]>*/
    `
  useEffect(() => {

    const node = document.querySelector("#collection-component-1682823359416")

    const script = document.createElement("script")
    script.id = "scriptShopify"
    script.innerHTML = scriptTag
    document.body.appendChild(script)

    const interval = setInterval(() => {
      if (node) {

        if (node.querySelectorAll("iframe").length >= 2)
          node.querySelector("iframe")?.remove()

      }
    }, 300)

    return () => {
      clearInterval(interval)
    }

  }, [])

  const { sideNavVisible } = useSideNav();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const subBodyStyle: CSSProperties = {
    overflowX: "hidden",
    width:
      sideNavVisible
        ? "calc(100vw - 130px)"
        : windowWidth && windowWidth <= 575
          ? "100vw"
          : "calc(100vw - 130px)",
  };

  const boxStyle = {
    width:
      sideNavVisible
        ? "calc(100vw - 150px)"
        : windowWidth && windowWidth <= 575
          ? "95vw"
          : "",
  }

  return <>
    <div className={css.body}>
      <Header />
      <Nav />
      <div className={css.subBody} style={subBodyStyle}>
        <div ref={collectionDivTagRef} id='collection-component-1682823359416'></div>
      </div>
      <Footer />
    </div>
  </>
}