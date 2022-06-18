import fetcher from '@lib/fetch'
import useSWR from 'swr'

const IndexPage = () => {
  const { data, error } = useSWR(
    `{
      Asvs {
        chapterName
      }
    }`,
    fetcher
  )
  console.log(data, "data asvs", error);
  return (
    <p>Hello</p>
  )
}

export default IndexPage
