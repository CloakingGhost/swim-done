import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router';
import PoolListItem from '../common/PoolListItem';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import NoContent from '../common/NoContent';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToggleMark } from '../../hooks/useToggleMark';
import AuthenticateRoute from '../common/AuthenticateRoute';
import { updatePools } from '../../store/slices/kakaoMapSlice';

export default function PoolList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDetailViewHidden = useSelector((state) => state.detailView.isHidden);
  const section = useSelector((state) => state.kakaoMap.section);
  const [pools, setPools] = useState(useSelector((state) => state.kakaoMap.pools));

  const [isLoading, setIsLoading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const { toggleMark, showLoginModal, setShowLoginModal } = useToggleMark();

  const updatePoolsHandler = (poolId, pools) => {
    dispatch(updatePools({ poolId, pools }));
  };
  const getPools = () => {
    setIsLoading(true);
    try {
      //처음에 6개만 보여줬다가 스크롤 내려가면 더 보여주기, 데이터는 pools 에 있음
      setCurrentIndex((prev) => prev + 6);
      setHasNext(currentIndex < pools.length);
    } catch {
      // TODO: 에러 핸들링 예정
      setHasNext(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onIntersect = async (entry, observer) => {
    if (isLoading || !hasNext) return;
    getPools();
  };

  const bottomRef = useInfiniteScroll(onIntersect, hasNext);

  const handlePoolListItemClick = (poolId) => {
    navigate(`${poolId}`);
  };

  useEffect(() => {
    if (section === null) {
      navigate('/');
    }
  }, []);

  useEffect(() => {}, [pools]);

  return (
    <>
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      {showLoginModal && <AuthenticateRoute cancleAction={() => setShowLoginModal(false)} />}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          <span className="text-black">'{section}'</span> 수영할 곳 찾고 계셨죠?
        </h1>
        <section className="flex flex-col items-center gap-5 w-full mt-10">
          {pools?.length === 0 ? (
            <NoContent title={'수영장 정보가 없습니다.'}></NoContent>
          ) : (
            pools?.slice(0, currentIndex).map((pool, index) => {
              return (
                <PoolListItem
                  key={index}
                  name={pool.name}
                  address={pool.address}
                  isMarked={pool.mark}
                  onToggleMark={() => {
                    updatePoolsHandler(index, pools);
                    toggleMark(index, pools, setPools);
                  }}
                  onClick={() => handlePoolListItemClick(pool.id)}
                />
              );
            })
          )}
        </section>
      </div>
      {hasNext && <div ref={bottomRef}></div>}
      {!isDetailViewHidden && (
        <div className="fixed top-5 right-5 left-135 bottom-5 min-w-200 rounded-3xl bg-white overflow-y-scroll">
          <Outlet></Outlet>
        </div>
      )}
    </>
  );
}
