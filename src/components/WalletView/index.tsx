import React, { useState } from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { SUPPORTED_WALLETS } from "constants/wallet";
import { isMobile } from "utils/userAgent";
import { injected } from "connectors";
import MetamaskIcon from "assets/images/metamask.png";
import Link from "next/link";
import classNames from "classnames";

interface IProps {
  onFinish?: () => void;
}

interface WalletProps {
  onClick?: () => void;
  id: string;
  key: string;
  active?: boolean;
  color?: string;
  link?: string;
  header: string;
  icon: string;
}

const WalletOption: React.FC<WalletProps> = ({
  onClick,
  id,
  key,
  active,
  color,
  link,
  header,
  icon,
}) => {
  if (!link) {
    return (
      <div
        className={classNames(
          active ? "border-green-200" : "border-gray-200",
          "p-4 border-2 w-full font-medium shadow-sm rounded-xl cursor-pointer hover:border-blue-300"
        )}
        onClick={onClick}
      >
        {header}
      </div>
    );
  }

  return (
    <Link href={link}>
      <a
        target="_blank"
        className={classNames(
          active ? "border-green-200" : "border-gray-200",
          "p-4 border-2 w-full font-medium shadow-sm rounded-xl cursor-pointer hover:border-blue-300"
        )}
      >
        {header}
      </a>
    </Link>
  );
};

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

interface IProps {
    onClose?: () => void
  }

export const WalletView: React.VFC<IProps> = ({onClose}) => {
  const { active, account, connector, activate, error } = useWeb3React();
  const [walletView, setWalletView] = useState<string>(WALLET_VIEWS.ACCOUNT);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = "";
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true).then((success) => {
          console.log("SUCCESS", success)
        onClose();
      }).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          console.log("ERROR", error);
          // setPendingError(true)
        }
      });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        // if (option.connector === portis) {
        //   return null;
        // }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <WalletOption
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector);
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              icon={option.iconURL}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === "MetaMask") {
            return (
              <WalletOption
                id={`connect-${key}`}
                key={key}
                color={"#E8831D"}
                header={"Install Metamask"}
                link={"https://metamask.io/"}
                icon={MetamaskIcon}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <WalletOption
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            icon={option.iconURL}
          />
        )
      );
    });
  }

  return (
    <div className="flex flex-col justify-content items-center space-y-3">
      {getOptions()}
    </div>
  );
};
