import { useState, useEffect } from "react";

import IconGift from "../../../public/icon-gift.react.svg";
import IconTrash from "../../../public/icon-trash.react.svg";
import IconPlus from "../../../public/icon-plus.react.svg";
import IconMinus from "../../../public/icon-minus.react.svg";
import IconX from "../../../public/icon-x.react.svg";

import PaymentModal from "./PaymentModal";

import { cartTotalAmount, itemTotalAmount } from "./cartUtils";
import giftList from "./data";

interface MinicartQuantityBadgeProps {
  itemQuantity: number;
}
const MinicartQuantityBadge = ({
  itemQuantity,
}: MinicartQuantityBadgeProps): JSX.Element => {
  return (
    <div className="absolute top-[-0.5rem] right-0 flex h-[22px] min-w-[22px] select-none items-center justify-center rounded-full bg-black px-[0.4rem] text-xs text-white">
      {itemQuantity}
    </div>
  );
};

interface MinicartItemProps {
  cartItem: CartItem;
  updateCart: UpdateCart;
}
const MinicartItem = ({ cartItem, updateCart }: MinicartItemProps) => {
  return (
    <div className="flex min-h-[35px] items-center selection:bg-joanGreen-600 selection:text-white md:min-h-[auto]">
      <button
        className="mr-2 ml-[-0.25rem] flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full hover:bg-joanGreen-50"
        onClick={() => updateCart({ type: "removeItem", item: cartItem.name })}
      >
        <IconTrash className="h-[14.5px]" />
      </button>
      <div className="mr-4 flex items-center rounded-full border border-joanGreen-600">
        <button
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-joanGreen-50"
          onClick={() =>
            updateCart({ type: "increaseItemQuantity", item: cartItem.name })
          }
        >
          <IconPlus className="h-[18px] stroke-joanGreen-600 stroke-1" />
        </button>
        <div className="w-4 select-none text-center text-xs">
          {cartItem.quantity}
        </div>
        <button
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-joanGreen-50"
          onClick={() =>
            updateCart({ type: "decreaseItemQuantity", item: cartItem.name })
          }
        >
          <IconMinus className="h-[14px] " />
        </button>
      </div>
      <div className="flex-grow leading-tight">{cartItem.name}</div>
      <div className="ml-4">
        R$
        {cartItem.price
          ? cartItem.price * cartItem.quantity
          : itemTotalAmount(cartItem, giftList)}
      </div>
    </div>
  );
};

interface MinicartItemListProps {
  updateCart: UpdateCart;
  setPaymentOpen: SetPaymentOpen;
  cart: Cart;
  setItemListOpen: SetItemListOpen;
  open: boolean;
}
const MinicartItemList = ({
  cart,
  updateCart,
  setPaymentOpen,
  setItemListOpen,
  open,
}: MinicartItemListProps): JSX.Element => {
  if (!open) return <></>;
  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center bg-black bg-opacity-60 text-joanGreen-600 md:hidden"
        onClick={() => setItemListOpen(false)}
      ></div>

      <div className="fixed bottom-0 left-0 right-0 z-40 animate-fade-in-up  shadow-xl md:static md:mb-4">
        <div className="flex flex-col rounded-t-lg border border-joanGreen-600 bg-white text-sm uppercase text-joanGreen-600 md:w-[29rem] md:rounded-md">
          <button
            className="-right-[0.85rem] flex min-h-[2rem] min-w-[2rem] items-center justify-center self-end rounded-full border-joanGreen-600 bg-white p-[0.75rem] hover:bg-joanGreen-50 md:absolute md:-top-[0.85rem] md:border md:p-0"
            onClick={() => setItemListOpen(false)}
          >
            <IconX className="h-[1.75rem] md:h-[0.875rem]" />
          </button>
          <div className="space-y-4 p-4 pt-0 md:pt-6">
            <div className="space-y-2">
              {cart.map((cartItem, index) => (
                <MinicartItem
                  key={index}
                  cartItem={cartItem}
                  updateCart={updateCart}
                />
              ))}
            </div>
            <div className="border-t border-joanGreen-600 pt-2 text-right text-black selection:bg-black selection:text-white">
              <span className="mr-4">Total</span>
              <span>R${cartTotalAmount(cart, giftList)}</span>
            </div>
          </div>
          <button
            className="h-12 select-none border-t border-joanGreen-600 bg-joanGreen-600 text-base uppercase text-white hover:bg-joanGreen-550 md:rounded-b-sm"
            onClick={() => setPaymentOpen(true)}
          >
            Pagar agora
          </button>
        </div>
      </div>
    </>
  );
};

interface MinicartFloatingButtonProps {
  itemQuantity: number;
}
const MinicartFloatingButton = ({
  itemQuantity,
}: MinicartFloatingButtonProps): JSX.Element => {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-joanGreen-600 bg-white text-joanGreen-600 shadow-xl">
      {itemQuantity > 0 && (
        <MinicartQuantityBadge itemQuantity={itemQuantity} />
      )}
      <IconGift className="h-[33px]" />
    </div>
  );
};

interface MinicartProps {
  updateCart: UpdateCart;
  cart: Cart;
  itemListOpen: boolean;
  setItemListOpen: SetItemListOpen;
}
const Minicart = ({
  cart,
  updateCart,
  itemListOpen,
  setItemListOpen,
}: MinicartProps): JSX.Element => {
  const itemQuantity = cart.reduce(
    (accumulator: number, item: CartItem) => (accumulator += item.quantity),
    0
  );
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    if (paymentOpen) document.body.style.overflow = "hidden";
    if (!paymentOpen) document.body.style.overflow = "unset";
  }, [paymentOpen]);

  return (
    <>
      {paymentOpen && (
        <PaymentModal cart={cart} setPaymentOpen={setPaymentOpen} />
      )}
      <div className="relative z-40">
        <div className="fixed bottom-4 right-4 flex flex-col items-end md:bottom-6 md:right-6 lg:bottom-12 lg:right-12">
          {itemQuantity > 0 && (
            <MinicartItemList
              cart={cart}
              updateCart={updateCart}
              setPaymentOpen={setPaymentOpen}
              setItemListOpen={setItemListOpen}
              open={itemListOpen}
            />
          )}
          {itemQuantity > 0 ? (
            <button
              className="rounded-full"
              onClick={() =>
                itemListOpen ? setItemListOpen(false) : setItemListOpen(true)
              }
            >
              <MinicartFloatingButton itemQuantity={itemQuantity} />
            </button>
          ) : (
            <a href="#lista-de-presentes">
              <MinicartFloatingButton itemQuantity={itemQuantity} />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Minicart;
