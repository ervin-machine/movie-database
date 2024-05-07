import styles from "./List.module.css"
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

type ListProps = {
    value: any;
    dataSource: any[];
  }

export const List = (props: ListProps) => {
  const { dataSource, value } = props;
  const detailLink = value === 0 ? "tv" : (value === 1 ? "movie" : null)

  useGSAP(() => {
    setTimeout(() => {
      ScrollTrigger.batch("#list > #listItem", {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1, 
            stagger: 0.15,
            overwrite: true
          }),
        onLeave: (batch) => 
          gsap.set(batch, {
            autoAlpha: 0, 
            overwrite: true
          }),
          onEnterBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              stagger: 0.15,
              overwrite: true
            }),
          onLeaveBack: (batch) => 
            gsap.set(batch, {
              autoAlpha: 0, 
              overwrite: true
            })
      })
    }, 1100)
    
  }, [])

  return (
    <section id="list" className={styles.list}>
        {dataSource.map((item, index) => 
          <div id="listItem" className={styles.listItem} key={index}>
            <Link to={`${detailLink}/${item.id}`} state={{item, detailLink}}>
              <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt={`${item.original_title || item.original_name}-backdrop`} />
              <p>{ item.original_title || item.original_name }</p>
            </Link>
          </div>
        )}
    </section>
  );
};