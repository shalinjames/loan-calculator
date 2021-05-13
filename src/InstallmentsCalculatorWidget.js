import * as React from "react";
import ReactDOM from "react-dom";
import MonthlyInstallmentCalculator from "./pages/MonthlyInstallmentCalculator";

export default class InstallmentCalculator extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement("span");
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(mountPoint);

        ReactDOM.render(React.createElement(MonthlyInstallmentCalculator, {}, React.createElement("slot")),
            mountPoint
        );
    }
}

window.customElements.define("installment-calculator", InstallmentCalculator);
