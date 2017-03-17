import React from 'react';
import classnames from 'classnames';
import Popover from '../Popover';
import Button from '../Button';
import Menu from '../menu/Menu';
import MenuList from '../menu/MenuList';
import MenuHeader from '../menu/MenuHeader';
import MenuSection from '../menu/MenuSection';

const propTypes = {
  anchor: React.PropTypes.string,
  onChange: React.PropTypes.func,
  target: React.PropTypes.object,
  width: React.PropTypes.string,
  onClose: React.PropTypes.func,
  size: React.PropTypes.string,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  blank: React.PropTypes.string,
  hint: React.PropTypes.string,
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
  margin: React.PropTypes.number,
  disablePortal: React.PropTypes.bool,
};

const defaultProps = {
  selected: [],
  options: [],
  size: 'small',
  width: 'auto',
};

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  onChange(option) {
    this.props.onChange(option);

    if (this.popover && !this.props.multiple) {
      this.popover.close();
    }
  }

  renderHint() {
    let jsx;

    if (this.props.hint) {
      jsx = (
        <MenuHeader title={ this.props.hint } />
      );
    }

    return jsx;
  }

  renderMenu() {
    const { size, options, selected } = this.props;
    let jsx;

    if (options.length > 0) {
      jsx = (
        <Menu size={ size }>
          <MenuList
            options={ options }
            selected={ selected }
            multiple={ this.props.multiple }
            onChange={ this.onChange }
          />
        </Menu>
      );
    } else if (this.props.blank) {
      jsx = <p className="rc-dropdown-blank">{ this.props.blank }</p>;
    }

    return <MenuSection className="rc-dropdown-menu-section-list">{ jsx }</MenuSection>;
  }

  renderApplyButton() {
    let jsx;

    if (this.props.multiple) {
      jsx = (
        <MenuSection className="rc-dropdown-menu-section-actions">
          <Button
            block
            size="small"
            label="Apply"
          />
        </MenuSection>
      );
    }

    return jsx;
  }

  render() {
    const menu = this.renderMenu();
    const hint = this.renderHint();
    const applyButton = this.renderApplyButton();
    const className = classnames('rc-dropdown-menu', `rc-dropdown-menu-${this.props.size}`, {
      'rc-dropdown-menu-multiple': this.props.multiple,
    });

    return (
      <Popover
        anchor={ this.props.anchor }
        ref={ (c) => { this.popover = c; } }
        className={ className }
        target={ this.props.target }
        onClose={ this.onClose }
        margin={ this.props.margin }
        size={ this.props.size }
        width={ this.props.width }
        disablePortal={ this.props.disablePortal }
      >
        { hint }
        { menu }
        { applyButton }
      </Popover>
    );
  }
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
