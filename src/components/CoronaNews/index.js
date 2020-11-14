import React, { useEffect, useState } from 'react';
import app from '../../services/firebase';
import 'firebase/database';
import Pagination from './Pagination';
import './style.css';
import { Card } from 'react-bootstrap';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [Npage, setNpage] = useState(1);
  const daysPerPage = 4;

  const indexOfLastNews = Npage * daysPerPage;
  const indexOfFirstNews = indexOfLastNews - daysPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (Npage) => {
    setNpage(Npage);
  };

  useEffect(() => {
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
    });
  }, []);
  console.log(news);

  return (
    <div className="pageconews">
      <h2>data corona</h2>
      <Pagination
        daysPerPage={daysPerPage}
        totalDays={news.length}
        paginate={paginate}
      />
      <div className="cards">
        {currentNews.length !== 0 ? (
          currentNews.map((data) => {
            return data.activity.map((berita, index) => {
              return (
                // <div className="divcard" key={index}>
                //   <h4>{berita.title}</h4>
                //   <h5>{berita.desc}</h5>
                //   <a href={berita.url}>{berita.url}</a>
                //   <br />
                // </div>
                <div className="card">
                  <div>
                    <h4>{berita.title}</h4>
                    <hr className="hr1"></hr>
                    <h5>{berita.desc}</h5>
                    <a href={berita.url}>{berita.url}</a>
                  </div>
                </div>
              );
            });
          })
        ) : (
          <p>no data</p>
        )}
      </div>

      {/* {news.map((data) => {
        return <p>{data}</p>;
      })} */}
    </div>
  );
};

export default CoronaNews;
