import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends PureComponent<any> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)