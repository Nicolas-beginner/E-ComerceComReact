import React from 'react'
import Style from "./Produto.module.css"
import useFetch from "../Hook/useFetch"
import Loading from '../components/Loading'
import ErroPage from './ErroPage'
import { useNavigate } from 'react-router-dom'
import Search from '../components/search'
import Head from '../components/head/head'

function Produto(props) {
    const { request, data, error, loading } = useFetch()

    const navigate = useNavigate()
    React.useEffect(() => {
        request(`https://ranekapi.origamid.dev/json/api/produto`)
    }, [request])

    function handleClick(name) {
        props.value(name)
        sessionStorage.setItem("produtoAtual", name)
        navigate(`/produto/${name}`)
    }

    return (
        <>
            <Search />
            <Head head="Produtos" />
            <div className={`${Style.Container} container`}>
                {loading && <Loading />}
                {error && <ErroPage />}
                {data && data.map(product => (
                    <div className={Style.Card} onClick={() => handleClick(product.nome)} key={product.id}>
                        <img src={product.fotos[0].src} alt="" key={product.id + "3"} />
                        <div className={Style.ContainerText} key={product.id + "q"}>
                            <p className={Style.preco} key={product.id + "m"}>R$ {product.preco[0]}.{product.preco.slice(1, product.preco.length)}</p>
                            <p className={Style.nome} key={product.id + "e"}>{product.nome}</p>
                            <p className={Style.desc} key={product.id + "s"}>{product.descricao}</p>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}

export default Produto
