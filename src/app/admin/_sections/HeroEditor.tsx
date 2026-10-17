"use client";
import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, type HeroSettings } from '@/lib/content-types';
import { api } from '../_lib/api';
import MediaPicker from '../_components/MediaPicker';
import { Button, Card, ErrorBlock, Field, LoadingBlock, PageHeader, TextArea, TextInput, useAction } from '../_components/ui';

function HeroPreview({ hero }: { hero: HeroSettings }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-900">
      {hero.backgroundUrl &&
        (hero.backgroundType === 'video' ? (
          <video key={hero.backgroundUrl} src={hero.backgroundUrl} poster={hero.posterUrl} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.backgroundUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ))}
      <div className="absolute inset-0 bg-black" style={{ opacity: hero.overlayOpacity / 100 }} />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-white">
        <p className="text-lg font-bold tracking-widest drop-shadow sm:text-2xl">{hero.headline}</p>
        {hero.tagline.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-[#22C55E] sm:text-base">
            {hero.tagline.map(w => (
              <span key={w}>{w}</span>
            ))}
          </div>
        )}
        {hero.verse && <p className="line-clamp-3 max-w-md text-[11px] leading-relaxed drop-shadow sm:text-xs">{hero.verse}</p>}
        {hero.ctaLabel && hero.ctaHref && (
          <span className="mt-2 rounded-lg bg-[#FF602E] px-3 py-1.5 text-xs font-semibold">{hero.ctaLabel}</span>
        )}
      </div>
    </div>
  );
}

export default function HeroEditor() {
  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [taglineText, setTaglineText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const run = useAction();

  useEffect(() => {
    api<HeroSettings>('/api/admin/settings/hero')
      .then(h => {
        setHero(h);
        setTaglineText(h.tagline.join(', '));
      })
      .catch(e => setError(e.message));
  }, []);

  if (error) return <ErrorBlock message={error} />;
  if (!hero) return <LoadingBlock />;

  const set = <K extends keyof HeroSettings>(key: K, value: HeroSettings[K]) => setHero(prev => (prev ? { ...prev, [key]: value } : prev));
  const setTagline = (text: string) => {
    setTaglineText(text);
    set('tagline', text.split(',').map(w => w.trim()).filter(Boolean).slice(0, 5));
  };

  async function save() {
    if (!hero) return;
    setSaving(true);
    await run(
      () =>
        api<HeroSettings>('/api/admin/settings/hero', {
          method: 'PUT',
          json: { ...hero, posterUrl: hero.posterUrl ?? '', ctaLabel: hero.ctaLabel ?? '', ctaHref: hero.ctaHref ?? '' },
        }).then(setHero),
      'Home hero updated — it is live on the home page.'
    );
    setSaving(false);
  }

  function resetToDefault() {
    setHero(DEFAULT_SETTINGS.hero);
    setTaglineText(DEFAULT_SETTINGS.hero.tagline.join(', '));
  }

  return (
    <>
      <PageHeader
        title="Home Hero"
        description="The big banner at the top of the home page. Use a photo or a short looping video."
        actions={
          <>
            <a href="/home" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50">
              View home page
            </a>
            <Button onClick={save} loading={saving}>Save changes</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <Card title="Background">
            <div className="mb-4 inline-flex rounded-lg bg-gray-100 p-1">
              {(['image', 'video'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    if (type !== hero.backgroundType) setHero({ ...hero, backgroundType: type, backgroundUrl: '' });
                  }}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold capitalize transition ${
                    hero.backgroundType === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  {type === 'image' ? 'Photo' : 'Video'}
                </button>
              ))}
            </div>
            <MediaPicker
              key={hero.backgroundType}
              value={hero.backgroundUrl}
              onChange={url => set('backgroundUrl', url)}
              kinds={[hero.backgroundType]}
            />
            {hero.backgroundType === 'video' && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700">Poster image (optional)</p>
                <p className="mb-2 text-xs text-gray-500">Shown while the video loads and on phones with data saver on.</p>
                <MediaPicker value={hero.posterUrl} onChange={url => set('posterUrl', url || undefined)} kinds={['image']} />
              </div>
            )}
            <div className="mt-6">
              <Field label={`Darken background: ${hero.overlayOpacity}%`} hint="Makes white text easier to read on bright photos.">
                <input
                  type="range"
                  min={0}
                  max={80}
                  step={5}
                  value={hero.overlayOpacity}
                  onChange={e => set('overlayOpacity', Number(e.target.value))}
                  className="w-full accent-[#FF602E]"
                />
              </Field>
            </div>
          </Card>

          <Card title="Text">
            <div className="space-y-4">
              <Field label="Headline" hint="Typed out letter by letter on the home page.">
                <TextInput value={hero.headline} maxLength={80} onChange={e => set('headline', e.target.value)} />
              </Field>
              <Field label="Highlight words" hint="Separate with commas (up to 5), e.g. CARING, CALLING, COMING">
                <TextInput value={taglineText} onChange={e => setTagline(e.target.value)} />
              </Field>
              <Field label="Bible verse">
                <TextArea rows={3} value={hero.verse} maxLength={600} onChange={e => set('verse', e.target.value)} />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Button text (optional)">
                  <TextInput value={hero.ctaLabel ?? ''} placeholder="e.g. Join us this Sunday" onChange={e => set('ctaLabel', e.target.value)} />
                </Field>
                <Field label="Button link">
                  <TextInput value={hero.ctaHref ?? ''} placeholder="/connect or https://…" onChange={e => set('ctaHref', e.target.value)} />
                </Field>
              </div>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-2">
          <div className="space-y-4 xl:sticky xl:top-6">
            <Card title="Preview">
              <HeroPreview hero={hero} />
              <p className="mt-3 text-xs text-gray-500">Changes go live as soon as you save.</p>
            </Card>
            <div className="flex flex-wrap gap-2">
              <Button onClick={save} loading={saving} className="flex-1">Save changes</Button>
              <Button variant="ghost" onClick={resetToDefault}>Reset to original</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
