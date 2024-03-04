import {getRouteData} from "@/utils/get-route-data";
import {getPage} from "@/utils/get-page";
import {IMeta} from "@/models/meta.model";
import {ISection} from "@/models/section.model";

const CatchAll = async ({ params }: { params: { path?: string[] } } ) => {
    const routeData = await getRouteData(params.path)
    const page = await getPage(routeData);
    return (
        <div>
            <header>
                <h1>
                    {page.meta.find((meta: IMeta) => meta.name === 'title').content}
                </h1>
                <p>
                    {page.meta.find((meta: IMeta) => meta.name === 'description').content}
                </p>
                <details>
                    <summary>Dane strony</summary>
                    <pre>
                        {JSON.stringify(page, null, 4)}
                    </pre>
                </details>
            </header>
            {page.sections.map((section: ISection) => {
                return (
                    <section key={section.sectionId}>
                        <h2>{section.type}</h2>
                        <details>
                            <summary>Dane sekcji</summary>
                            <pre>
                                {JSON.stringify(section, null, 4)}
                            </pre>
                        </details>
                    </section>
                )
            })}
            {/*<pre>*/}
            {/*    {JSON.stringify(page, null, 4)}*/}
            {/*</pre>*/}
            {/*<pre>*/}
            {/*    {JSON.stringify(routeData, null, 4)}*/}
            {/*</pre>*/}
        </div>
    );
}

export default CatchAll;
