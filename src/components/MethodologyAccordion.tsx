import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { TranslationDictionary } from '../data/translations';

interface MethodologyAccordionProps {
  t: TranslationDictionary;
}

export function MethodologyAccordion({ t }: MethodologyAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    drag: true,
    co2: false,
    units: false,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const items = [
    { id: 'drag', title: t.methodDragTitle, body: t.methodDragBody },
    { id: 'co2', title: t.methodCo2Title, body: t.methodCo2Body },
    { id: 'units', title: t.methodUnitsTitle, body: t.methodUnitsBody },
  ];

  return (
    <section
      id="methodology-section"
      aria-labelledby="methodology-heading"
      className="rounded border border-[#dfe1e2] bg-white p-6 dark:border-[#2e3846] dark:bg-[#1b222c]"
    >
      <h2
        id="methodology-heading"
        className="text-xl font-bold text-[#162e51] dark:text-[#f0f4f8]"
      >
        {t.methodologyTitle}
      </h2>
      <p className="mt-1 text-sm text-[#565c65] dark:text-[#a9b4c2]">
        {t.methodologySubtitle}
      </p>

      <div className="mt-5 divide-y divide-[#dfe1e2] border-y border-[#dfe1e2] dark:divide-[#2e3846] dark:border-[#2e3846]">
        {items.map((item) => {
          const isOpen = Boolean(openItems[item.id]);
          const panelId = `methodology-panel-${item.id}`;
          const btnId = `methodology-btn-${item.id}`;
          return (
            <div key={item.id}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  className="flex min-h-[52px] w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left text-base font-bold text-[#1b1b1b] transition-colors duration-150 hover:text-[#005ea2] dark:text-[#f0f4f8] dark:hover:text-[#73b3e7]"
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="pb-4 text-sm leading-relaxed text-[#3d4551] dark:text-[#c7d1dd]"
                >
                  <p className="max-w-[72ch]">{item.body}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
