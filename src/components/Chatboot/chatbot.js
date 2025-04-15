import { useEffect } from 'react';

const ChatbaseWidget = () => {
  useEffect(() => {

    if (window.chatbase && window.chatbase("getState") === "initialized") return;


    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });
    }

    const onLoad = () => {
      if (document.getElementById("v2hlwYdUB1UVmGhZNWxKV")) return;

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "v2hlwYdUB1UVmGhZNWxKV";
      script.dataset.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }


    return () => {
      window.removeEventListener("load", onLoad);
      const script = document.getElementById("v2hlwYdUB1UVmGhZNWxKV");
      if (script) {
        script.remove();
      }
    };
  }, []);

  return null;
};

export default ChatbaseWidget;