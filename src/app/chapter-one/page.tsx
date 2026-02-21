"use client";

import EmailModal from "@/components/first-chapter/read-first-chapter-popup";
import { Button } from "@/components/ui/button";
import { useState } from "react";



const Page: React.FC = () => {

    // First chapter popup states
    const [open, setOpen] = useState(false);

    return (
        <main>

            <section className="container flex flex-col justify-center items-center pt-12">
                <h1 className="statement text-2xl text-white">Chapter One</h1>
                <h1 className="statement text-2xl text-white mb-10">Trapped</h1>

                <div className="text-left mx-auto max-w-4xl pb-14 space-y-6">

                    <h1 className="statement text-1xl text-white">The Party</h1>
                    <p className="max-w-2xl mx-auto">My friend Terry invited me to his daughter’s 21st birthday party. A bar on a busy city street,
                        hired out just for us. It started late afternoon and was set to finish by ten. </p>

                    <p className="max-w-2xl mx-auto">I thought, why not? A couple of drinks, some familiar faces I hadn’t seen for a while, then
                        home before midnight.  </p>
                    <p className="max-w-2xl mx-auto">My kind of vibe. </p>
                    <p className="max-w-2xl mx-auto">It had that good family energy. Music, laughter, plates of food moving around, the young
                        ones playing, enjoying themselves.</p>
                    <p className="max-w-2xl mx-auto">By around nine, the birthday girl and her friends were ready to move on, hit the city, make a
                        night of it.</p>
                    <p className="max-w-2xl mx-auto">A few of us decided to head back to Terry’s flat instead. He lived nearby, so we walked. </p>
                    <p className="max-w-2xl mx-auto">A quiet voice told me, “Go home, the night’s over”. I thought I’d chill for an hour at his, then
                        call a taxi. </p>

                    <p className="max-w-2xl mx-auto">That was the first mistake. </p>

                    <h1 className="statement text-1xl text-white">The Box </h1>
                    <p className="max-w-2xl mx-auto">We got to his building. Eleven of us in total. Three women took the stairs. Six men, two
                        children headed for the lift. I considered taking the stairs.</p>
                    <p className="max-w-2xl mx-auto">For some reason I looked up before we entered the lift. The silver panel claimed the lift could
                        hold ten adults, so I thought nothing of it.  </p>
                    <p className="max-w-2xl mx-auto">That was my second mistake.   </p>
                    <p className="max-w-2xl mx-auto">The doors shut, it juddered upwards, then stopped. Dead. The screen flashing: Lift out of
                        service.  </p>
                    <p className="max-w-2xl mx-auto">At first, everyone laughed it off. Terry pressed the alarm on the intercom. A man answered.    </p>
                    <p className="max-w-2xl mx-auto">He told us no engineer was on site. He’d call one out but couldn’t give a specific time.   </p>
                    <p className="max-w-2xl mx-auto">Our smiling faces changed straight away to serious unease. We explained we had two
                        children with us, hoping he’d move faster.   </p>
                    <p className="max-w-2xl mx-auto">Ten minutes passed. It felt like thirty. The humidity’s rising. No movement. Terry pressed
                        the alarm again. Same answer. Still no engineer.   </p>
                    <p className="max-w-2xl mx-auto">That’s when I saw Terry tighten up. His breathing changed, frequent and shallow. Fear was
                        creeping in, with rage right behind it. He was close to breaking point.    </p>
                    <p className="max-w-2xl mx-auto">Fifteen minutes in, Terry snapped.    </p>

                    <h1 className="statement text-1xl text-white">Panic</h1>
                    <p className="max-w-2xl mx-auto">I’d known the man for six years. I’ve never seen him like this. His shirt off. Dripping in
                        sweat. Smashing the alarm button, shouting at the speaker.  </p>
                    <p className="max-w-2xl mx-auto">The noise bounced around the box. It destroyed the last bit of calm we had left.</p>

                    <p className="max-w-2xl mx-auto">Six feet by four. Nobody could sit down. All our bodies pressed together. Everyone sweating. </p>

                    <p className="max-w-2xl mx-auto">Then the arguments began. Terry’s brother shouting at him to calm down. He barked back.
                        His friends jumped in. All trying to stop the other from having a meltdown, or worse.  </p>

                    <p className="max-w-2xl mx-auto">Nowhere to hide. Torture. I stepped in, trying to stop them. It didn’t work. It made it worse.</p>



                    <h1 className="statement text-1xl text-white">I Nearly Lost It Myself</h1>
                    <p className="max-w-2xl mx-auto">My brains in overdrive, the same thought repeating: I need to get out of here. </p>
                    <p className="max-w-2xl mx-auto">That feeling of being caged. </p>
                    <p className="max-w-2xl mx-auto">I had to stop myself from breaking. I removed my jacket, leant against the wall, closed my
                        eyes for a second. Something inside wanted to let go, break something, shout, swear and
                        fight my way out of this. But there was no way out, no hack, no brute force, just the reality. </p>
                </div>

                <div className="flex gap-3 justify-center flex-wrap mt-7">
                    <Button className="btn primary pointer" onClick={() => setOpen(true)}>[ CONTINUE READING - DELIVERED PRIVATELY ]</Button>

                    <EmailModal isOpen={open} onClose={() => setOpen(false)} />
                </div>
            </section>



        </main >
    );
}

export default Page;
