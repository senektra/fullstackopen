import styles from './index.module.css'

const CountryFilter = ({ onChange, value }) => {
  return (
    <div>
      <div htmlFor='country-filter' className={styles['input-label']}>
        Filter Countries:
      </div>
      <input
        id='country-filter'
        type='text'
        onChange={onChange} 
        value={value}
        className={styles['filter']}
      />
    </div>
  )
}

export default CountryFilter