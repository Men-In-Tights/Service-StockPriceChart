import React from 'react';
import PriceChart from './pricechart.jsx';
import Chart from './chart.jsx';
import styles from './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.name = '';
    this.rating = '';
    this.owner = '';
    this.state = {
      id: 0,
      view: '1d',
      priceData: [{
        price: 0,
      }],
    };

    this.handleGetDay = this.handleGetDay.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }

  componentDidMount() {
    const id = this.handleRandom();
    this.handleGetDay(id, '1d');
  }

  handleRandom() {
    const min = 0;
    const max = 100;
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    this.setState({ id });
    return id;
  }

  handleGetDay(id, view) {
    fetch(`/pricechart/${id}/day`)
      .then(response => response.json())
      .then((data) => {
        this.name = data.company[0].name;
        this.rating = data.company[0].rating;
        this.owner = data.company[0].owner;
        this.setState({ priceData: data.prices });
      })
      .catch(error => console.log(error));
  }

  handlePriceChange(price) {
    price = `$${price}`;
    document.getElementById(styles.mainPrice).innerHTML = price;
  }

  changeView(view) {
    if (view === '1w') {
      this.handleGetWeek(this.state.id + 1, view);
    } else if (view === '1m') {
      this.handleGetWeek(this.state.id + 2, view);
    } else if (view === '3m') {
      this.handleGetWeek(this.state.id + 3, view);
    } else if (view === '1y') {
      this.handleGetWeek(this.state.id + 4, view);
    } else {
      this.handleGetDay(this.state.id, '1d');
    }
  }

  render() {
    const { name, rating, owner } = this;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.name}><h1>{name}</h1></div>
          <a to="analyst-ratings" className={styles.tag} href="#">
            <span className={styles.tagIcon}>
              <svg width="16" height="16" viewBox="0 0 28 28"><g fillRule="evenodd" transform="translate(-4 -4)"><path id="tag-a" d="M20.99975,8 C20.44775,8 19.99975,7.552 19.99975,7 C19.99975,6.448 20.44775,6 20.99975,6 C21.55175,6 21.99975,6.448 21.99975,7 C21.99975,7.552 21.55175,8 20.99975,8 M21.99975,4 L14.82775,4 C14.29775,4 13.78875,4.21 13.41375,4.585 L4.58575,13.414 C3.80475,14.195 3.80475,15.461 4.58575,16.242 L11.75675,23.414 C12.53775,24.195 13.80475,24.195 14.58575,23.414 L23.41375,14.586 C23.78875,14.211 23.99975,13.702 23.99975,13.172 L23.99975,6 C23.99975,4.896 23.10375,4 21.99975,4"></path></g></svg>
            </span>
            <span className={styles.innerTag}>
              {rating}
              %
            </span>
            <span className={styles.tagTooltip}>{rating}% of analysts agree that {name} is a buy.</span>
          </a>
          <a to="price-paid" className={styles.tag} href="#">
            <span className={styles.tagIcon}>
              <svg width="16" height="16" viewBox="0 0 18 20"><g fillRule="evenodd"><ellipse cx="6" cy="3.5" rx="3.333" ry="3.5"></ellipse><path d="M4.224,8.4 L7.776,8.4 L7.776,8.4 C10.1088508,8.4 12,10.2911492 12,12.624 L12,14 L0,14 L0,12.624 L8.8817842e-16,12.624 C6.02486595e-16,10.2911492 1.89114922,8.4 4.224,8.4 Z"></path></g></svg>
            </span>
            <div className={styles.innerTag}>
              {owner}
            </div>
            <span className={styles.tagTooltip}>{owner} people own {name} on our website.</span>
          </a>
        </div>
        <div id={styles.mainPrice}>
          ${this.state.priceData[0].price}
        </div>
        <Chart state={this.state} handlePriceChange={this.handlePriceChange} />
        <div className={styles.nav}>
          <span className={this.state.view === '1d'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={() => this.changeView('1d')}>
            1D
          </span>
          <span className={this.state.view === '1w'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={() => this.changeView('1w')}>
            1W
          </span>
          <span className={this.state.view === '1m'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={() => this.changeView('1m')}>
            1M
          </span>
          <span className={this.state.view === '3m'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={() => this.changeView('3m')}>
            3M
          </span>
          <span className={this.state.view === '1y'
            ? styles.navSelected
            : styles.navUnselected}
            onClick={() => this.changeView('1y')}>
            1Y
          </span>
        </div>
      </div>
    );
  }
}

export default App;

// this.handleGetWeek = this.handleGetWeek.bind(this);

// handleGetWeek(id, view) {
//   fetch(`/api/symbol/${id}/week`)
//     .then(response => response.json())
//     .then(priceData => this.setState({ priceData, view }))
//     .catch(error => console.log(error));
  // }