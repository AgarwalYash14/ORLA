import FAQSection from '../components/FAQSection'
import TechnologySection from '../components/TechnologySection'
import UseCasesSection from '../components/UseCasesSection'
import Workflow from '../components/Workflow'
import Footer from '../layout/Footer'
import Hero from './Hero'

export default function Main() {
    return (
        <>
            <div className="z-40 flex justify-between">
                <div className="border-tertiary w-[4%] border-r" />
                <div className="w-[92%]">
                    <div
                        id="hero"
                        className="border-tertiary relative h-[calc(100vh-5rem)]"
                    >
                        <Hero />
                    </div>
                    <div className="border-tertiary grid h-20 grid-cols-4 border-t">
                        <div className="" />
                        <div className="border-tertiary border-s-2 border-e" />
                        <div className="border-tertiary border-r-2" />
                    </div>
                    <div id="workflow">
                        <Workflow />
                    </div>
                    <div id="technology">
                        <TechnologySection />
                    </div>
                    <div id="use-cases">
                        <UseCasesSection />
                    </div>
                    <div id="faq">
                        <FAQSection />
                    </div>
                </div>
                <div className="border-tertiary w-[4%] border-l" />
            </div>
            <Footer />
        </>
    )
}
