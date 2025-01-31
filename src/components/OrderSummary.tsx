import { CartItem } from '../redux/cart/types';
import { OrderTotalInfo } from './OrderTotalInfo';
import { OrderForm } from './OrderForm';

interface OrderSummaryProps {
  cartItems: CartItem[];
  categoryNames: string[];
  onDeleteAll: () => void;
}

export const OrderSummary = ({ cartItems, categoryNames, onDeleteAll }: OrderSummaryProps) => {
  return (
    <div className="right bg-gray-100 rounded-lg sm:relative sm:top-4 fixed top-[100px] right-[3%] sm:right-0 flex flex-col sm:p-0 p-4">
      <OrderTotalInfo cartItems={cartItems} categoryNames={categoryNames} onDeleteAll={onDeleteAll} />
      <OrderForm />
    </div>
  );
};
