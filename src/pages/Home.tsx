import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { CategoryFilter, ProductList } from "@/components";
import { selectCategoryId } from "@/redux/products/selectors";
import { setCategoryId } from "@/redux/products/slice";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryNames } from "@/constants";

export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = useSelector(selectCategoryId);

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
    const name = categoryNames[index].toLowerCase();
    navigate(`/?category=${name}`, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catSlug = params.get("category");

    if (catSlug) {
      const catId = Object.keys(categoryNames).findIndex(
        (key) =>
          categoryNames[Number(key)].toLowerCase() === catSlug.toLowerCase()
      );
      if (catId !== -1) {
        dispatch(setCategoryId(catId));
      } else {
        dispatch(setCategoryId(0));
      }
    } else {
      dispatch(setCategoryId(0));
    }
  }, [location.search, dispatch]);

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div>
        <p
          style={{ lineHeight: "125%" }}
          className="text-[40px] animate__animated animate__zoomInDown sm:text-[23px] pb-[1%] font-[600] text-center"
        >
          Behind each of our cups hides an{" "}
          <span className="text-[#B0907A] leading-[1px] italic">
            <br className="sm:hidden" />
            amazing surprise
          </span>
        </p>
      </div>

      <div className="mt-8">
        <CategoryFilter
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <ProductList categoryId={categoryId} />
      </div>
    </div>
  );
};
