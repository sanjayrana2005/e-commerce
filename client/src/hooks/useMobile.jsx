import { useState, useEffect } from "react"

const useMobie = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

    const handleResize = () => {
        const checkpoint = window.innerWidth < breakpoint
        setIsMobile(checkpoint)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.addEventListener("resize", handleResize)
        }
    }, [])
    return [isMobile]
}

export default useMobie