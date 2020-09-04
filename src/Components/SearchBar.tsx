import React, { FormEvent } from 'react';
import logo from "../Assets/logo-512-filmku.png";
import { DropdownProps, Input } from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import styles from './SearchBar.module.css';

interface SearchBarProps {
  query: string;
  yearRange: any[];
  handleLogoClick: () => void;
  handleSearchInputChange: (event: FormEvent<HTMLInputElement>) => void;
  handleEnterKeyDown: any;
  handleButtonSearchClick: () => void;
  handleYearPickChange: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {

  return (
    <div className={styles.SearchBarContainer}>
      <img src={logo} alt="logo-filmku" className={styles.Logo} onClick={props.handleLogoClick}/>
      <Input fluid className={styles.InputSearch} type='text' placeholder='Search movie...' action>
        <input onChange={props.handleSearchInputChange} onKeyDown={props.handleEnterKeyDown} value={props.query}/>
        {/*<Select fluid*/}
        {/*        clearable*/}
        {/*        options={props.yearRange}*/}
        {/*        defaultValue='articles'*/}
        {/*        placeholder='Pick Year'*/}
        {/*        className={styles.SelectYear}*/}
        {/*        onChange={props.handleYearPickChange}*/}
        {/*/>*/}
        <Button type='submit' icon onClick={props.handleButtonSearchClick}><Icon name='search'/></Button>
      </Input>
    </div>
  )
};

export default SearchBar;
